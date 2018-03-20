import Unit from './Unit';
export default class Queue {
    public queue: Unit[];
    constructor(units: Unit[]) {
        this.queue = this.sort(units);
    }
    
    public sort(units: Unit[]): Unit[] {
        return units.sort((current: Unit, next: Unit) => {
            return (current.stats.initiative > next.stats.initiative) ? 1 : ((next.stats.initiative > current.stats.initiative) ? -1 : 0);
        });
    }

    public next(): void {
        this.queue = this.queue.filter((el: Unit) => {
            return el.stats.HP > 0;
        });
        if (this.queue.length === 1) return;
        let first: Unit = this.queue[0];
        this.queue.splice(0, 1);
        if (first.stats.HP > 0) this.queue.push(first);
    }

}