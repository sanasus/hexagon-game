import Hexagon from "./Hexagon";
import Coordinate from "./Coordinate";
import Unit from './Unit';

export default class AttackUnit {
  public parent: Unit;
  public attackName: string = 'attack_01';

  constructor(unit: Unit) {
    this.parent = unit;
    this.parent.on('attack-end', (param: any) => this.hit(param.target, param.attacker));
  }

  public attack(enemy: Unit): void {
    if (enemy.hex === null) return;
    if (enemy.stats.HP === 0) return;
    Coordinate.hexNeighbors(enemy.hex.coordinateOffset).forEach((el: IHex) => {
      if (this.parent.hex !== null && Coordinate.hexIsEqual(el, this.parent.hex.coordinate)) {
        this.parent.flipToEnemy(enemy.container);
        this.parent.emit('attack', { name: this.attackName, target: enemy, attacker: this.parent });
      }
    });
  }

  private hit(enemy: Unit, attacker: Unit): void {
    this.parent.flipToEnemy(enemy.container);
    this.parent.unit.animation.fadeIn('hit', 0.2);
    this.parent.stats.HP -= enemy.stats.atk;
    this.parent.emit('changeHP');
    attacker.stats.HP -= 10;
    attacker.emit('changeHP');
    if (this.parent.stats.HP <= 0) {
      this.parent.stats.HP = 0;
      this.parent.emit('death');
      this.parent.death();
    }
  }
}