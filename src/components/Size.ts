import { Component } from "../ecs/types.js";

export interface Size extends Component {
    type: "Size";
    width: number;
    height: number;
}

export function createSize(width: number, height: number): Size {
    return { type: "Size", width, height };
}