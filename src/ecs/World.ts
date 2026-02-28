import { Entity, Component, ComponentType, System, WorldInterface } from "./types.js";

export class World implements WorldInterface {
    private nextEntityId: number = 0;
    private entities: Set<Entity> = new Set();
    private components: Map<Entity, Map<ComponentType, Component>> = new Map();
    private systems: System[] = [];

    // --- Entity管理 ---

    createEntity(): Entity {
        const id = this.nextEntityId++;
        this.entities.add(id);
        this.components.set(id, new Map());
        return id;
    }

    removeEntity(entity: Entity): void {
        this.entities.delete(entity);
        this.components.delete(entity);
    }

    // --- Component管理 ---

    addComponent(entity: Entity, component: Component): void {
        const entityComponents = this.components.get(entity);
        if (entityComponents) {
            entityComponents.set(component.type, component);
        }
    }

    getComponent<T extends Component>(entity: Entity, type: ComponentType): T | undefined {
        const entityComponents = this.components.get(entity);
        if (!entityComponents) return undefined;
        return entityComponents.get(type) as T | undefined;
    }

    getEntitiesWithComponents(...types: ComponentType[]): Entity[] {
        const result: Entity[] = [];
        for (const entity of this.entities) {
            const entityComponents = this.components.get(entity);
            if (!entityComponents) continue;

            const hasAll = types.every(type => entityComponents.has(type));
            if (hasAll) {
                result.push(entity);
            }
        }
        return result;
    }

    getEntityCount(): number {
        return this.entities.size;
    }

    // --- System管理 ---

    addSystem(system: System): void {
        this.systems.push(system);
    }

    update(deltaTime: number): void {
        for (const system of this.systems) {
            system.update(this, deltaTime);
        }
    }
}