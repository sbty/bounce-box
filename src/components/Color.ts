import { Component } from "../ecs/types.js";

export interface BoxColor extends Component {
    type: "Color";
    r: number;
    g: number;
    b: number;
    a: number;
}

export function createColor(r: number, g: number, b: number, a: number = 1): BoxColor {
    return { type: "Color", r, g, b, a };
}