import Map from "./Map";
import Hexagon from "./Hexagon";
import TextureGenerator from "./TextureGenerator";
import Coordinate from "./Coordinate";
import {mapGroup} from './Display';

export default class Biom extends PIXI.projection.Sprite2d {
  public hex: Hexagon;
  public isBlock: boolean;
  public cost: number;
  constructor(hex: Hexagon, img: number) {
    super(TextureGenerator.texture[img]);
    this.hex = hex;
    this.isBlock = Biom.isBlock(img);
    this.cost = Biom.getCost(img);
    this.position.set(hex.center.x, hex.center.y);
    // this.interactive = true;
    // this.hitArea = TextureGenerator.polygon;
    this.anchor.set(0.5);
    this.parentGroup = mapGroup;
  }

  public static getCost(cell: number): number {
    return (cell === 2) ? 3 : 1;
  }
  public static isBlock(cell: number): boolean {
    return cell === 1;
  }
}