import { getTestContext } from '../../../renderers/gl/shader/program/getTestContext';
import { checkMaxIfStatementsInShader } from './checkMaxIfStatementsInShader';

let maxTexturesPerBatchCache: number | null = null;

/**
 * Returns the maximum number of textures that can be batched. This uses WebGL1's `MAX_TEXTURE_IMAGE_UNITS`.
 * The response for this is that to get this info via WebGPU, we would need to make a context, which
 * would make this function async, and we want to avoid that.
 * @private
 * @deprecated Use `Renderer.limits.maxBatchableTextures` instead.
 * @returns {number} The maximum number of textures that can be batched
 */
export function getMaxTexturesPerBatch(): number
{
    throw new Error("STUB");
}
