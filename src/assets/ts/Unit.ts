import { dragonBones} from "dragonbones-pixi";
import Map from "./Map";
import Hexagon from "./Hexagon";
import MoveUnit from "./MoveUnit";
import AttackUnit from "./AttackUnit";
import AnimationUnit from "./AnimationUnit";
import ContainerUnit from "./ContainerUnit";
import Biom from "./Biom";
import Coordinate from "./Coordinate";

export default class Unit extends PIXI.utils.EventEmitter {
  private _armatureDisplay: dragonBones.PixiArmatureDisplay;
  public hex: Hexagon | null = null;
  public container: PIXI.projection.Sprite2d;
  public stats: any = { HP: 500, maxHP: 500, atk: 250, initiative: 10, mobility: 3, energy: 1};
  public move: MoveUnit;
  public attack: AttackUnit;
  public animation: AnimationUnit;

  constructor(armatureName: string) {
    super();
    let unit: any = dragonBones.PixiFactory.factory.buildArmatureDisplay(armatureName);
    if (unit === null) {
      throw new Error('ERROR buildArmatureDisplay');
    } else {
      this._armatureDisplay = unit;
    }
    this.move = new MoveUnit(this);
    this.attack = new AttackUnit(this);
    this.animation = new AnimationUnit(this);
    this.container = new ContainerUnit(this);
    this.unit.scale.set(0.25);
    this.gui();
  }

  get unit(): dragonBones.PixiArmatureDisplay {
    return this._armatureDisplay;
  }

  public addToMap(container: any, hex?: Hexagon): void {
    if (this.container.parent !== null) return;
    if (hex) {
      if (Map.hexIsBlock(hex.coordinate) || Map.hexIsUnit(hex.coordinate)) return;
      this.setHex(hex);
    }
    container.addChild(this.container);
  }

  public setHex(hex: Hexagon): void {
    this.hex = hex;
    this.container.x = hex.center.x;
    this.container.y = hex.center.y;
    hex.unit = this;
  }

  public flip(leftOrRight: string = 'right'): number {
    if (leftOrRight === 'left') return this.unit.scale.x = -Math.abs(this.unit.scale.x);
    else return this.unit.scale.x = Math.abs(this.unit.scale.x);
  }

  public flipToEnemy(enemy: IAxial): void {
    if (this.container.x < enemy.x)  this.flip();
    else this.flip('left');
  }

  public death(): void {
    if (this.hex !== null) this.hex.unit = null;
    this.hex = null;
  }

  private gui(): void {
    // if (window.GUI.fPlayer !== undefined) window.GUI.removeFolder(window.GUI.fPlayer);
    // window.GUI.fPlayer = window.GUI.addFolder('player');
    // window.GUI.fPlayer.add(this.unit.scale, 'x');
    // window.GUI.fPlayer.add(this.unit.scale, 'y');
    // window.GUI.fPlayer.add(this.unit, 'rotation');
  }
}