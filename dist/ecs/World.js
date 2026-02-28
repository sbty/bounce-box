export class World {
    constructor() {
        this.nextEntityId = 0;
        this.entities = new Set();
        this.components = new Map();
        this.systems = [];
    }
    // --- Entity管理 ---
    createEntity() {
        const id = this.nextEntityId++;
        this.entities.add(id);
        this.components.set(id, new Map());
        return id;
    }
    removeEntity(entity) {
        this.entities.delete(entity);
        this.components.delete(entity);
    }
    // --- Component管理 ---
    addComponent(entity, component) {
        const entityComponents = this.components.get(entity);
        if (entityComponents) {
            entityComponents.set(component.type, component);
        }
    }
    getComponent(entity, type) {
        const entityComponents = this.components.get(entity);
        if (!entityComponents)
            return undefined;
        return entityComponents.get(type);
    }
    getEntitiesWithComponents(...types) {
        const result = [];
        for (const entity of this.entities) {
            const entityComponents = this.components.get(entity);
            if (!entityComponents)
                continue;
            const hasAll = types.every(type => entityComponents.has(type));
            if (hasAll) {
                result.push(entity);
            }
        }
        return result;
    }
    getEntityCount() {
        return this.entities.size;
    }
    // --- System管理 ---
    addSystem(system) {
        this.systems.push(system);
    }
    update(deltaTime) {
        for (const system of this.systems) {
            system.update(this, deltaTime);
        }
    }
}
//# sourceMappingURL=World.js.map