import { World } from "./ecs/World.js";
import { MovementSystem } from "./ecs/systems/MovementSystem.js";
import { BounceSystem } from "./ecs/systems/BounceSystem.js";
import { RenderSystem } from "./ecs/systems/RenderSystem.js";
import { SpawnSystem } from "./ecs/systems/SpawnSystem.js";
// --- Canvas初期化 ---
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const countDisplay = document.getElementById("count");
canvas.width = 800;
canvas.height = 500;
// --- ECS World作成 ---
const world = new World();
// --- システム登録 ---
const spawnSystem = new SpawnSystem();
world.addSystem(spawnSystem);
world.addSystem(new MovementSystem());
world.addSystem(new BounceSystem(canvas.width, canvas.height));
world.addSystem(new RenderSystem(ctx));
// --- 初期Entityを数個生成 ---
for (let i = 0; i < 5; i++) {
    spawnSystem.queueSpawn(100 + Math.random() * (canvas.width - 200), 100 + Math.random() * (canvas.height - 200));
}
// --- クリックイベント ---
canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // 1クリックで3つ生成
    for (let i = 0; i < 3; i++) {
        spawnSystem.queueSpawn(x, y);
    }
});
// --- 右クリックで全消し ---
canvas.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    const entities = world.getEntitiesWithComponents("Position");
    for (const entity of entities) {
        world.removeEntity(entity);
    }
});
// --- ゲームループ ---
let lastTime = performance.now();
function gameLoop(currentTime) {
    const deltaTime = (currentTime - lastTime) / 1000; // 秒に変換
    lastTime = currentTime;
    // 全システム更新
    world.update(deltaTime);
    // UI更新
    countDisplay.textContent = `Boxes: ${world.getEntityCount()}`;
    requestAnimationFrame(gameLoop);
}
// --- スタート ---
console.log("🎮 Bounce Box - ECS Game Started!");
console.log("  Click: spawn boxes");
console.log("  Right-click: clear all");
requestAnimationFrame(gameLoop);
//# sourceMappingURL=main.js.map