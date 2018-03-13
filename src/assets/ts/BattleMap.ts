import Map from "./Map";
import Hexagon from "./Hexagon";
import PointLike = PIXI.PointLike;

export default class BattleMap extends PIXI.projection.Container2d {
  constructor() {
    super();
    this.name = 'BattleMap';
    Map.matrixFor((hex: Hexagon) => {
      this.addChild(hex);
    });
    this.position.set(window.app.view.width / 2 - this.width / 2,
      window.app.view.height / 2 - this.height / 2);
    let AxisY: any = {
      "AxisY-x": -100,
      "AxisY-y": 800,
      "affine": -0.2
    };
    this.proj.setAxisY( < PointLike > {
      x: AxisY["AxisY-x"],
      y: AxisY["AxisY-y"]
    }, AxisY["affine"]);
  }

  private addDevInfo(): void {
    Map.matrix.forEach((row: Hexagon[]) => {
      row.forEach((hex: Hexagon) => {
        this.devInfo(hex);
      });
    });
  }

  private devInfo(hex: Hexagon): void {
    let options: PIXI.TextStyle = new PIXI.TextStyle({
      fontSize: 16,
      fill: '#fff',
      stroke: '#000',
      strokeThickness: 3,
    });
    let optionsOffset: PIXI.TextStyle = new PIXI.TextStyle({
      fontSize: 12,
      fill: '#fff',
      stroke: '#000',
      strokeThickness: 3,
    });
    let coordinate: PIXI.projection.Text2d = new PIXI.projection.Text2d(
      hex.coordinate.col + ',' + hex.coordinate.row, options);
    let coordinateOffset: PIXI.projection.Text2d = new PIXI.projection.Text2d(
      hex.coordinateOffset.col + ',' + hex.coordinateOffset.row, optionsOffset);
    coordinateOffset.x = hex.center.x + 5;
    coordinateOffset.y = hex.center.y;
    coordinate.x = hex.center.x - 5;
    coordinate.y = hex.center.y;
    coordinate.anchor.set(1, 0);
    coordinateOffset.anchor.set(0);
    this.addChild(coordinate, coordinateOffset);
  }
}