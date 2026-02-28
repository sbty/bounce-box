import { createPosition } from "../../components/Position.js";
import { createVelocity } from "../../components/Velocity.js";
import { createSize } from "../../components/Size.js";
import { createColor } from "../../components/Color.js";
export class SpawnSystem {
    constructor() {
        this.name = "SpawnSystem";
        this.pendingSpawns = [];
    }
    queueSpawn(x, y) {
        this.pendingSpawns.push({ x, y });
    }
    update(world, _deltaTime) {
        for (const spawn of this.pendingSpawns) {
            const entity = world.createEntity();
            const boxSize = 10 + Math.random() * 25;
            // ランダムな速度（-200 ~ 200）
            const vx = (Math.random() - 0.5) * 400;
            const vy = (Math.random() - 0.5) * 400;
            // ランダムなネオンカラー
            const colors = [
                { r: 255, g: 50, b: 100 }, // ピンク
                { r: 50, g: 255, b: 150 }, // グリーン
                { r: 80, g: 150, b: 255 }, // ブルー
                { r: 255, g: 200, b: 50 }, // イエロー
                { r: 200, g: 80, b: 255 }, // パープル
                { r: 255, g: 100, b: 50 }, // オレンジ
                { r: 50, g: 255, b: 255 }, // シアン
            ];
            const c = colors[Math.floor(Math.random() * colors.length)];
            world.addComponent(entity, createPosition(spawn.x - boxSize / 2, spawn.y - boxSize / 2));
            world.addComponent(entity, createVelocity(vx, vy));
            world.addComponent(entity, createSize(boxSize, boxSize));
            world.addComponent(entity, createColor(c.r, c.g, c.b, 0.9));
        }
        this.pendingSpawns = [];
    }
}
//# sourceMappingURL=SpawnSystem.js.map