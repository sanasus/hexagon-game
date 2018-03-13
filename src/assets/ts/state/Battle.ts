import {
  State
} from "../pixi-game";
import Map from "../Map";
import BattleMap from '../BattleMap';
import Background from "../Background";
import SkillBar from "../UI/SkillBar";
import Hexagon from "../Hexagon";
import Biom from "../Biom";
import Unit from '../Unit';
import {
  BattleEvent
} from '../BattleEvent';
import Queue from '../Queue';

export default class Battle extends State {
  public static bg: PIXI.Sprite;
  public static mapContainer2d: PIXI.projection.Container2d;
  public static player: Unit;
  public static enemies: Unit[];
  public static queue: Queue;

  public init(): void {
    Battle.bg = new Background(this.assets['bg'].texture);
    Battle.mapContainer2d = new BattleMap();
    Battle.player = new Unit('mecha_1004d');
    Battle.enemies = [
      new Unit('mecha_1004d'),
      new Unit('mecha_1004d'),
      new Unit('mecha_1004d'),
      new Unit('mecha_1004d')
    ];
    Battle.queue = new Queue(Battle.enemies);
  }

  public preload(): void {}

  public create(): void {
    let EB: BattleEvent = new BattleEvent();
    this.add(Battle.bg);
    this.add(Battle.mapContainer2d);

    Map.dataMatrixFor((row: number[], rowID: number, biom: number, colID: number) => {
      if (biom !== 0)
        Battle.mapContainer2d.addChild(new Biom(Map.matrix[rowID][colID], biom));
    });

    Map.matrixFor((hex: Hexagon) => {
      if (!Map.hexIsBlock(hex.coordinate) && Battle.enemies !== null) {
        Battle.enemies.forEach((unit: Unit) => {
          if ((unit.hex === null) && (hex.coordinate.col === Map.width - 1) && !Map.hexIsUnit(hex.coordinate)) {
            unit.addToMap(Battle.mapContainer2d, hex);
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