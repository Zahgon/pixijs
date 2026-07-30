import { canUseNewCanvasBlendModes } from './canUseNewCanvasBlendModes';

import type { BLEND_MODES } from '../../shared/state/const';

const FALLBACK_BLEND: GlobalCompositeOperation = 'source-over';

/**
 * Builds the Canvas blend mode map for Pixi blend enums.
 * @returns A mapping of Pixi blend modes to canvas composite ops.
 * @internal
 */
export function mapCanvasBlendModesToPixi(): Record<BLEND_MODES, GlobalCompositeOperation | null>
{
    throw new Error("STUB");
}
