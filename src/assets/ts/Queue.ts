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
        let first: Unit = this.queue[0];
        this.queue.splice(0, 1);
        this.queue.push(first);
    }

}