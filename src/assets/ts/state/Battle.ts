import { State } from "../pixi-game";
import Map from "../Map";
import BattleMap from '../BattleMap';
import Background from "../Background";
import SkillBar from "../UI/SkillBar";
import Hexagon from "../Hexagon";
import Biom from "../Biom";
import Unit from '../Unit';
import { BattleEvent } from '../BattleEvent';
import Queue from '../Queue';
import PathDraw from '../PathDraw';

export default class Battle extends State {
  public static bg: PIXI.Sprite;
  public static BattleMap: PIXI.projection.Container2d;
  public static player: Unit;
  public static enemies: Unit[];
  public static Queue: Queue;
  public static PathDraw: PathDraw;

  public init(): void {
    Battle.bg = new Background(this.assets['bg'].texture);
    Battle.BattleMap = new BattleMap();
    Battle.player = new Unit('mecha_1004d');
    Battle.enemies = [
      new Unit('mecha_1004d'),
      new Unit('mecha_1004d'),
      new Unit('mecha_1004d'),
      new Unit('mecha_1004d')
    ];
    Battle.PathDraw = new PathDraw();
    Battle.Queue = new Queue(Battle.enemies);
  }

  public preload(): void { }

  public create(): void {
    let EB: BattleEvent = new BattleEvent();
    this.add(Battle.bg);
    this.add(Battle.BattleMap);

    Map.dataMatrixFor((row: number[], rowID: number, biom: number, colID: number) => {
      if (biom !== 0)
        Battle.BattleMap.addChild(new Biom(Map.matrix[rowID][colID], biom));
    });

    Map.matrixFor((hex: Hexagon) => {
      if (!Map.hexIsBlock(hex.coordinate) && Battle.enemies !== null) {
        Battle.enemies.forEach((unit: Unit) => {
          if ((unit.hex === null) && (hex.coordinate.col === Map.width - 1) && !Map.hexIsUnit(hex.coordinate)) {
            unit.addToMap(Battle.BattleMap, hex);
          }
        });
      }
    });
    // const skillBar: SkillBar = new SkillBar();
  }

  public update(): void {
    PIXI.keyboardManager.update();
  }
}