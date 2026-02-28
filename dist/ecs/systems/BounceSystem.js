export class BounceSystem {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.name = "BounceSystem";
    }
    update(world, _deltaTime) {
        const entities = world.getEntitiesWithComponents("Position", "Velocity", "Size");
        for (const entity of entities) {
            const pos = world.getComponent(entity, "Position");
            const vel = world.getComponent(entity, "Velocity");
            const size = world.getComponent(entity, "Size");
            // 左右の壁
            if (pos.x <= 0) {
                pos.x = 0;
                vel.vx = Math.abs(vel.vx);
            }
            else if (pos.x + size.width >= this.canvasWidth) {
                pos.x = this.canvasWidth - size.width;
                vel.vx = -Math.abs(vel.vx);
            }
            // 上下の壁
            if (pos.y <= 0) {
                pos.y = 0;
                vel.vy = Math.abs(vel.vy);
            }
            else if (pos.y + size.height >= this.canvasHeight) {
                pos.y = this.canvasHeight - size.height;
                vel.vy = -Math.abs(vel.vy);
            }
        }
    }
}
//# sourceMappingURL=BounceSystem.js.map