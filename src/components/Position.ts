import { Component } from "../ecs/types.js";

export interface Position extends Component {
    type: "Position";
    x: number;
    y: number;
}

export function createPosition(x: number, y: number): Position {
    return { type: "Position", x, y };
}