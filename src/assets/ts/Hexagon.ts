import Coordinate from "./Coordinate";
import setting from "./setting";
import Unit from "./Unit";
import Biom from "./Biom";
import TextureGenerator from './TextureGenerator';

export default class Hexagon extends PIXI.projection.Sprite2d {
  public static readonly size: number = setting.hex.size;
  public static readonly hexH: number = Hexagon.size * 2;
  public static readonly hexW: number = Math.sqrt(3) / 2 * Hexagon.hexH;
  public static readonly hOffset: number = Hexagon.hexW + Hexagon.size / 10;
  public static readonly vOffset: number = Hexagon.hexH * (3 / 4) + Hexagon.size / 10;
  public center: IAxial = {
    x: 0,
    y: 0
  };
  public biom: Biom | null = null;
  public unit: Unit | null = null;
  public colID: number;
  public rowID: number;
  public hexOffset: IHex;

  constructor(colID: number, rowID: number) {
    super(TextureGenerator.texture[0]);
    this.colID = colID;
    this.rowID = rowID;
    this.hexOffset = Coordinate.axialOffset(this.colID, this.rowID);
    this.center = {
      x: Hexagon.hOffset * (this.colID + 1) - ((this.rowID % 2 === 0) ? Hexagon.hOffset : Hexagon.hOffset / 2) + Hexagon.size,
      y: Hexagon.vOffset * (this.rowID + 1) - Hexagon.vOffset + Hexagon.size,
    };
    this.position.set(this.center.x, this.center.y);
    this.interactive = true;
    this.hitArea = TextureGenerator.polygon;
    this.anchor.set(0.5);
  }

  get coordinate(): IHex {
    return {
      col: this.colID,
      row: this.rowID
    };
  }
  get coordinateOffset(): IHex {
    return this.hexOffset;
  }
}