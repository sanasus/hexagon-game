import {
    dragonBones
} from "dragonbones-pixi";
import Unit from './Unit';

export default class AnimationUnit {
    public isComplete: boolean = true;
    public parent: Unit;
    constructor(unit: Unit) {
        this.parent = unit;
        this.parent.unit.on(dragonBones.EventObject.COMPLETE, this.animationComplete.bind(this));
        this.parent.unit.on(dragonBones.EventObject.LOOP_COMPLETE, this.loopComplete.bind(this));
        this.parent.unit.on(dragonBones.EventObject.START, this.start.bind(this));
        this.parent.on('death', () => {
            this.isComplete = false;
            this.parent.unit.animation.fadeIn('death', 0.2);
        });
        this.parent.on('attack', (param: any) => {
            this.isComplete = false;
            this.parent.unit.animation.play(param.name);
            this.parent.unit.once(dragonBones.EventObject.COMPLETE, (event: dragonBones.EventObject) => {
                param.target.emit('attack-end', param);
                this.isComplete = true;
            });
        });
        this.parent.on('move-start', () => {
            this.isComplete = false;
            this.parent.unit.animation.fadeIn('walk', 0.5);
            this.parent.unit.animation.timeScale = this.parent.move.moveSpeed;
        });
        this.parent.on('move-end', () => {
            this.parent.unit.animation.stop();
            this.parent.unit.animation.timeScale = 1;
            this.parent.unit.animation.fadeIn('idle', 0.2);
            this.isComplete = true;
        });
        this.parent.unit.animation.play('idle');
    }

    private animationComplete(event: dragonBones.EventObject): void {
        // console.log('complete', event.animationState.name);
        if (event.animationState.name === "death") {
            this.parent.unit.animation.stop();
            return;
        }
        this.parent.unit.animation.play("idle");
    }

    private loopComplete(event: dragonBones.EventObject): void {
        // console.log('loopComplete');
    }

    private start(event: dragonBones.EventObject): void {
        // console.log('start', event.animationState.name);
        // console.log('frameComplete');
    }
}