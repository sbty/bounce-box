import { System, WorldInterface } from "../types.js";
import { Position } from "../../components/Position.js";
import { Velocity } from "../../components/Velocity.js";
import { Size } from "../../components/Size.js";

export class BounceSystem implements System {
    name = "BounceSystem";

    constructor(
        private canvasWidth: number,
        private canvasHeight: number
    ) {}

    update(world: WorldInterface, _deltaTime: number): void {
        const entities = world.getEntitiesWithComponents("Position", "Velocity", "Size");

        for (const entity of entities) {
            const pos = world.getComponent<Position>(entity, "Position")!;
            const vel = world.getComponent<Velocity>(entity, "Velocity")!;
            const size = world.getComponent<Size>(entity, "Size")!;

            // 左右の壁
            if (pos.x <= 0) {
                pos.x = 0;
                vel.vx = Math.abs(vel.vx);
            } else if (pos.x + size.width >= this.canvasWidth) {
                pos.x = this.canvasWidth - size.width;
                vel.vx = -Math.abs(vel.vx);
            }

            // 上下の壁
            if (pos.y <= 0) {
                pos.y = 0;
                vel.vy = Math.abs(vel.vy);
            } else if (pos.y + size.height >= this.canvasHeight) {
                pos.y = this.canvasHeight - size.height;
                vel.vy = -Math.abs(vel.vy);
            }
        }
    }
}