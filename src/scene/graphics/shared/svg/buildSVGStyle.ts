import { Color } from '../../../../color/Color';

import type { ConvertedFillStyle, ConvertedStrokeStyle } from '../FillTypes';
import type { SVGDefsCollector } from './buildSVGDefinitions';

/**
 * Converts a fill style into SVG attribute string fragments.
 * Handles solid colours and gradients (via the defs collector).
 * @param style
 * @param defs
 * @internal
 */
export function buildSVGFillAttributes(style: ConvertedFillStyle, defs: SVGDefsCollector): string
{
    throw new Error("STUB");
}

/**
 * Converts a stroke style into SVG attribute string fragments.
 * @param style
 * @param defs
 * @internal
 */
export function buildSVGStrokeAttributes(style: ConvertedStrokeStyle, defs: SVGDefsCollector): string
{
    throw new Error("STUB");
}
