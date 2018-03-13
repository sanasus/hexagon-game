import { Game } from "./pixi-game/index";
let mapGroup: any;
export function addDisplayGroups(App: Game): void {
    let stage: any = new PIXI.display.Stage();
    stage.group.enableSort = true;
    App.stage = stage;

    mapGroup = new PIXI.display.Group(0, true);
    mapGroup.on('sort', (sprite: any) => {
        sprite.zOrder = -sprite.y;
    });
    App.stage.addChild(new PIXI.display.Layer(mapGroup));
}
export {mapGroup};