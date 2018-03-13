import Hexagon from './Hexagon';
import Biom from './Biom';

export default class Map {
  public static width: number = 0;
  public static height: number = 0;
  public static dataMatrix: number[][] = [[]];
  public static matrix: Hexagon[][] = [[]];

  public static setMatrix(matrix: number[][]): void {
    this.width = matrix[0].length;
    this.height = matrix.length;
    this.dataMatrix = matrix;
    this.createMap(this.dataMatrix);
  }

  public static getPathHex(path: IHex[]): Hexagon[] {
    let arr: Hexagon[] = [];
    path.forEach((hex: IHex) => {
      if (!this.hexInMap) hex.col = this.width - 1;
      arr.push(this.matrix[hex.row][hex.col]);
    });
    return arr;
  }

  public static hexInMap(hex: IHex): boolean {
    return !(Map.matrix[hex.row] === undefined || Map.matrix[hex.row][hex.col] === undefined);
  }

  public static hexIsBlock(hex: IHex): boolean {
    return Biom.isBlock(Map.dataMatrix[hex.row][hex.col]);
  }

  public static hexIsUnit(hex: IHex): boolean {
    return Map.matrix[hex.row][hex.col].unit !== null;
  }

  public static hexToID(hex: IHex): number {
    return hex.row * this.width + hex.col;
  }

  public static dataMatrixFor(cb: (row: number[], rowID: number, biom: number, colID: number) => void): void {
    Map.dataMatrix.forEach((row: number[], rowID: number) => {
      row.forEach((biom: number, colID: number) => {
        cb(row, rowID, biom, colID);
      });
    });
  }

  public static matrixFor(cb: (hex: Hexagon) => void): void {
    Map.matrix.forEach((row: Hexagon[]) => {
      row.forEach((hex: Hexagon) => {
        cb(hex);
      });
    });
  }

  public static createMap(oldmatrix: number[][]): void {
    let matrix: Hexagon[][] = [];
    oldmatrix.forEach((row: number[], rowID: number) => {
      matrix.push([]);
      row.forEach((col: number, colID: number) => {
        let hex: Hexagon = new Hexagon(colID, rowID);
        matrix[rowID].push(hex);
      });
    });
    this.matrix = matrix;
  }
}
