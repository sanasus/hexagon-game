import PathFind from './PathFind';
import Map from './Map';
import Hexagon from './Hexagon';
import { OutlineFilter } from "pixi-filters";

export default class PathDraw {
  private filterSuccess: OutlineFilter = new OutlineFilter(2, 0x99ff99);
  private filterDanger: OutlineFilter = new OutlineFilter(2, 0x000000);
  private costText: PIXI.Text = new PIXI.Text('0', new PIXI.TextStyle({
    fontSize: 12,
    fill: '#fff',
    stroke: '#000',
    strokeThickness: 3,
  }));

  constructor() {
    PathFind.event.on(PathFind.BEFORE_PATH_FIND, this.beforeFind.bind(this));
    PathFind.event.on(PathFind.AFTER_PATH_FIND, (unitHex: Hexagon) => this.afterFind(unitHex));
  }

  public clear(): void {
    PathFind.pathPoints.forEach((el: IHex, id: number) => {
      Map.matrix[el.row][el.col].filters = [];
      if (PathFind.pathPoints.length - 1 === id) {
        Map.matrix[el.row][el.col].removeChild(this.costText);
      }
    });
  }

  private draw(unitHex: Hexagon): void {
    PathFind.pathPoints.forEach((el: IHex, id: number) => {
      if (unitHex.unit)
        if (PathFind.pathCost[id] > unitHex.unit.stats.mobility) {
          Map.matrix[el.row][el.col].filters = [this.filterDanger];
        } else {
          Map.matrix[el.row][el.col].filters = [this.filterSuccess];
        }
      if (PathFind.pathPoints.length - 1 === id) {
        this.costText.text = PathFind.pathCost[PathFind.pathCost.length - 1].toString();
        this.costText.anchor.set(0.5);
        Map.matrix[el.row][el.col].addChild(this.costText);
      }
    });
  }

  private beforeFind(): void {
    this.clear();
  }

  private afterFind(unitHex: Hexagon): void {
    this.draw(unitHex);
  }
}