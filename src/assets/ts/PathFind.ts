import Coordinate from "./Coordinate";
import Map from "./Map";
import Hexagon from "./Hexagon";
import Unit from "./Unit";
import Biom from "./Biom";

interface ICameFrom {
  [propName: string]: IHex | null;
}

interface ICostSoFar {
  [propName: string]: number;
}

interface IPriorHex {
  prior: number;
  hex: IHex;
}

export default class PathFind {
  public static event: PIXI.utils.EventEmitter = new PIXI.utils.EventEmitter();
  public static pathPoints: IHex[] = [];
  public static pathCost: number[] = [0];
  public static readonly BEFORE_PATH_FIND: string = 'BEFORE_PATH_FIND';
  public static readonly AFTER_PATH_FIND: string = 'AFTER_PATH_FIND';

  private static priorQueue: IPriorHex[] = [];
  private static start: IHex = {col: 0, row: 0};
  private static finish: IHex = {col: 0, row: 0};
  private static cameFrom: ICameFrom = {};
  private static costSoFar: ICostSoFar = {};

  public static playerPath(start: Hexagon | null, finish: Hexagon): void {
    if (!start) return;
    this.event.emit(this.BEFORE_PATH_FIND);
    this.getPath(start, finish);
    this.event.emit(this.AFTER_PATH_FIND, start);
    // console.log(this.pathPoints);
    // console.log(this.pathCost);
  }

  private static getPath(start: Hexagon, finish: Hexagon): void {
    this.start = start.coordinateOffset;
    this.finish = finish.coordinateOffset;
    if (Map.hexIsBlock(start.coordinate) || this.isBlock(finish.coordinate)) return;
    this.getAllPath();
    this.getFindPath();
  }

  private static getAllPath(): void {
    this.priorQueue = [];
    this.addPriorFrontier(this.start, 0);
    this.cameFrom = {};
    this.costSoFar = {};
    this.cameFrom[JSON.stringify(this.start)] = null;
    this.costSoFar[JSON.stringify(this.start)] = 0;
    let current: IPriorHex;
    let date: any = new Date().getMilliseconds();
    while (this.priorQueue.length !== 0) {
      current = this.getPriorFrontier();
      if (current.hex.col === this.finish.col && current.hex.row === this.finish.row) break;

      Coordinate.axialOffsetNeighbors(current.hex).forEach((next: IHex) => {
        let nextHex: IHex = Coordinate.axialHexToHex(next);
        if (!Map.hexInMap(nextHex) || this.isBlock(nextHex)) return;
        let nextOffset: IPriorHex = {
          prior: Biom.getCost(Map.dataMatrix[nextHex.row][nextHex.col]),
          hex: next,
        };
        let newCost: number = this.costSoFar[JSON.stringify(current.hex)] +  nextOffset.prior;
        if (this.nextNotInCostSoFar(nextOffset.hex) || newCost < this.costSoFar[JSON.stringify(nextOffset.hex)]) {
          this.costSoFar[JSON.stringify(nextOffset.hex)] = newCost;
          let prior: number = newCost + Coordinate.offsetHexDistance(this.finish, nextOffset.hex);
          this.addPriorFrontier(nextOffset.hex, prior);
          this.cameFrom[JSON.stringify(nextOffset.hex)] = current.hex;
        }
      });
    }
    // console.log(date - new Date().getMilliseconds(), 'ms');
  }

  private static getFindPath(): void {
    this.pathPoints = [];
    this.pathCost = [];
    let current: IHex | null = this.finish;
    let currentString: string;
    while (current) {
      currentString = JSON.stringify(current);
      this.pathPoints.push(Coordinate.axialToHex(current.col, current.row));
      this.pathCost.push(this.costSoFar[currentString]);
      current = this.cameFrom[currentString];
    }
    this.pathCost.reverse();
    if (this.pathPoints.length === 1) this.pathPoints = [];
    else this.pathPoints.reverse();
  }

  private static getPriorFrontier(): IPriorHex {
    this.priorQueue = this.priorQueue.sort((current: IPriorHex, next: IPriorHex) => {
      return (current.prior > next.prior) ? 1 : ((next.prior > current.prior) ? -1 : 0);
    });
    let hex: IPriorHex = this.priorQueue[0];
    this.priorQueue.shift();
    return hex;
  }

  private static addPriorFrontier(h: IHex, p: number): any {
    this.priorQueue.push({prior: p, hex: h});
  }

  private static nextNotInCostSoFar(next: IHex): boolean {
    for (let key in this.costSoFar) {
      if (key === JSON.stringify(next)) return false;
    }
    return true;
  }

  private static isBlock(hex: IHex): boolean {
    return Map.hexIsBlock(hex) || Map.hexIsUnit(hex);
  }
}