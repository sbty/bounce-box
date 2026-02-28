import { Component } from "../ecs/types.js";

export interface Velocity extends Component {
    type: "Velocity";
    vx: number;
    vy: number;
}

export function createVelocity(vx: number, vy: number): Velocity {
    return { type: "Velocity", vx, vy };
}