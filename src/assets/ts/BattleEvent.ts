import Battle from './state/Battle';
import Map from './Map';
import Hexagon from './Hexagon';
import PathFind from './PathFind';

export class BattleEvent extends PIXI.utils.EventEmitter {
    constructor() {
        super();
        Map.matrixFor((hex: Hexagon) => {
            hex.on('mouseover', () => this.mapMousemove(hex));
            hex.on('click', () => this.mapClick(hex));
        });
        PIXI.keyboardManager.on('pressed', (key: any) => {
            if (key === PIXI.keyboard.Key.ESCAPE) {
                Battle.PathDraw.clear();
                Battle.Queue.next();
            }
        });
    }

    public mapMousemove(hex: Hexagon): void {
        if (Battle.Queue.queue[0].hex !== null && Battle.Queue.queue[0].animation.isComplete) {
            PathFind.playerPath(Battle.Queue.queue[0].hex, hex);
        }
    }

    public mapClick(hex: Hexagon): void {
        if (Battle.Queue.queue[0].hex === null) Battle.Queue.queue[0].addToMap(Battle.BattleMap, hex);
        if (Battle.Queue.queue[0].animation.isComplete) {
            if (hex.unit !== null) Battle.Queue.queue[0].attack.attack(hex.unit);
            else {
                Battle.Queue.queue[0].move.setMovePath(Map.getPathHex(PathFind.pathPoints));
            }
        }
    }
}