export class MovementSystem {
    constructor() {
        this.name = "MovementSystem";
    }
    update(world, deltaTime) {
        const entities = world.getEntitiesWithComponents("Position", "Velocity");
        for (const entity of entities) {
            const pos = world.getComponent(entity, "Position");
            const vel = world.getComponent(entity, "Velocity");
            pos.x += vel.vx * deltaTime;
            pos.y += vel.vy * deltaTime;
        }
    }
}
//# sourceMappingURL=MovementSystem.js.map