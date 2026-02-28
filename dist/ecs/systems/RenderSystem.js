export class RenderSystem {
    constructor(ctx) {
        this.ctx = ctx;
        this.name = "RenderSystem";
    }
    update(world, _deltaTime) {
        const canvas = this.ctx.canvas;
        // 画面クリア（残像エフェクト付き）
        this.ctx.fillStyle = "rgba(10, 10, 10, 0.3)";
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
        const entities = world.getEntitiesWithComponents("Position", "Size", "Color");
        for (const entity of entities) {
            const pos = world.getComponent(entity, "Position");
            const size = world.getComponent(entity, "Size");
            const color = world.getComponent(entity, "Color");
            // ネオン風グロー
            this.ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`;
            this.ctx.shadowBlur = 15;
            // 四角を描画
            this.ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
            this.ctx.fillRect(pos.x, pos.y, size.width, size.height);
            // 枠線
            this.ctx.strokeStyle = `rgba(255, 255, 255, 0.3)`;
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(pos.x, pos.y, size.width, size.height);
        }
        // 影リセット
        this.ctx.shadowBlur = 0;
    }
}
//# sourceMappingURL=RenderSystem.js.map