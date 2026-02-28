import { System, WorldInterface } from "../types.js";
import { Position } from "../../components/Position.js";
import { Velocity } from "../../components/Velocity.js";

export class MovementSystem implements System {
    name = "MovementSystem";

    update(world: WorldInterface, deltaTime: number): void {
        const entities = world.getEntitiesWithComponents("Position", "Velocity");

        for (const entity of entities) {
            const pos = world.getComponent<Position>(entity, "Position")!;
            const vel = world.getComponent<Velocity>(entity, "Velocity")!;

            pos.x += vel.vx * deltaTime;
            pos.y += vel.vy * deltaTime;
        }
    }
}