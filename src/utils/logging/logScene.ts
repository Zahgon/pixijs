/* eslint-disable no-console */

import { Sprite } from '../../scene/sprite/Sprite';

import type { Container } from '../../scene/container/Container';
import type { RenderGroup } from '../../scene/container/RenderGroup';

const colors = [
    '#000080', // Navy Blue
    '#228B22', // Forest Green
    '#8B0000', // Dark Red
    '#4169E1', // Royal Blue
    '#008080', // Teal
    '#800000', // Maroon
    '#9400D3', // Dark Violet
    '#FF8C00', // Dark Orange
    '#556B2F', // Olive Green
    '#8B008B' // Dark Magenta
];

let colorTick = 0;

/**
 * @param container
 * @param depth
 * @param data
 * @param data.color
 * @internal
 */
export function logScene(container: Container, depth = 0, data: {color?: string} = { color: '#000000' })
{
    throw new Error("STUB");
}

/**
 * @param renderGroup
 * @param depth
 * @param data
 * @param data.index
 * @param data.color
 * @internal
 */
export function logRenderGroupScene(
    renderGroup: RenderGroup, depth = 0,
    data: {index: number, color?: string} = { index: 0, color: '#000000' }
)
{
    throw new Error("STUB");
}
