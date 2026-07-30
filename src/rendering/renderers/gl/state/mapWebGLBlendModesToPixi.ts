import { DOMAdapter } from '../../../../environment/adapter';

import type { BLEND_MODES } from '../../shared/state/const';
import type { GlRenderingContext } from '../context/GlRenderingContext';

/**
 * Maps gl blend combinations to WebGL.
 * @param gl
 * @returns {object} Map of gl blend combinations to WebGL.
 * @internal
 */
export function mapWebGLBlendModesToPixi(gl: GlRenderingContext): Record<BLEND_MODES, number[]>
{
    throw new Error("STUB");
}
