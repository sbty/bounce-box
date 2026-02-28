// EntityはただのID
export type Entity = number;

// コンポーネントの型名
export type ComponentType = string;

// コンポーネントのベースインターフェース
export interface Component {
    type: ComponentType;
}

// システムのインターフェース
export interface System {
    name: string;
    update(world: WorldInterface, deltaTime: number): void;
}

// Worldのインターフェース（循環参照回避用）
export interface WorldInterface {
    createEntity(): Entity;
    removeEntity(entity: Entity): void;
    addComponent(entity: Entity, component: Component): void;
    getComponent<T extends Component>(entity: Entity, type: ComponentType): T | undefined;
    getEntitiesWithComponents(...types: ComponentType[]): Entity[];
    getEntityCount(): number;
}