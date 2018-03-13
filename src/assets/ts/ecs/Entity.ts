export class Entity {
    public static id: number = 0;
    public components: any = {};

    constructor() {
        Entity.id++;
    }

    public addComponent(component: any): void {
        this.components[component.name] = component;
    }
    public removeComponent(componentName: string): void {
        delete this.components[name];
    }
    public print(): void {
        console.log(JSON.stringify(this, null, 4));
    }
}