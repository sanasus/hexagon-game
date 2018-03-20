import Hexagon from "./Hexagon";
import PathFind from "./PathFind";
import Unit from './Unit';

export default class MoveUnit {
  public parent: Unit;
  public moveSpeed: number = 3;
  private movePath: Hexagon[] = [];
  private shared: any;

  constructor(unit: Unit) {
    this.parent = unit;
  }

  public setMovePath(path: Hexagon[]): void {
    if (path.length === 0) return;
    this.movePath = path;
    this.parent.emit('move-start');
    this.shared = (delta: number): void => this.move(delta);
    PIXI.ticker.shared.add(this.shared);
  }

  private move(delta: number): void {
    if (this.movePath.length > 1) {
      let fin: IAxial = this.movePath[1].center;
      if (this.step(fin)) {
        this.movePath[0].unit = null;
        this.parent.setHex(this.movePath[1]);
        this.movePath.splice(0, 1);
      }
    } else {
      PIXI.ticker.shared.remove(this.shared);
      this.parent.emit('move-end');
    }
  }

  private step(fin: IAxial): boolean {
    if (fin.y !== this.parent.container.y) {
      this.stepDirection(fin, 'x', this.moveSpeed / 1.8);
      this.stepDirection(fin, 'y', this.moveSpeed);
    } else {
      this.stepDirection(fin, 'x', this.moveSpeed);
    }
    return fin.x === this.parent.container.x && fin.y === this.parent.container.y;
  }

  private stepDirection(fin: IAxial, direction: 'x' | 'y', speed: number): void {
    if (fin[direction] > this.parent.container[direction]) {
      if (direction === 'x') this.parent.flip();
      this.parent.container[direction] += speed * PIXI.ticker.shared.speed;
      if (fin[direction] < this.parent.container[direction]) this.parent.container[direction] = fin[direction];
    }
    if (fin[direction] < this.parent.container[direction]) {
      if (direction === 'x') this.parent.flip('left');
      this.parent.container[direction] -= speed * PIXI.ticker.shared.speed;
      if (fin[direction] > this.parent.container[direction]) this.parent.container[direction] = fin[direction];
    }
  }
}