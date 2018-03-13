import TextureGenerator from '../../TextureGenerator';
export function Texture(entity: any, container: PIXI.Container): PIXI.Sprite {
    let sprite: PIXI.Sprite = new PIXI.Sprite();
    sprite.position.set(entity.center);
    container.addChild(sprite);
    return sprite;
}