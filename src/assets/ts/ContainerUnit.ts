import Unit from './Unit';
import { mapGroup } from './Display';

export default class ContainerUnit extends PIXI.projection.Sprite2d {
    constructor(unit: Unit) {
        super(PIXI.Texture.WHITE);
        this.tint = 0xff0000;
        this.proj.affine = PIXI.projection.AFFINE.AXIS_X;
        this.anchor.set(0.5, 0.5);
        this.addChild(unit.unit);
        this.parentGroup = mapGroup;
    }
}