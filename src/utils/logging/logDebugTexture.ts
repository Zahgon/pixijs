import { RendererType } from '../../rendering/renderers/types';

import type { WebGLRenderer } from '../../rendering/renderers/gl/WebGLRenderer';
import type { WebGPURenderer } from '../../rendering/renderers/gpu/WebGPURenderer';
import type { Texture } from '../../rendering/renderers/shared/texture/Texture';
import type { Renderer } from '../../rendering/renderers/types';

/**
 * Logs a texture to the console as a base64 image.
 * This can be very useful for debugging issues with rendering.
 * @param texture - The texture to log
 * @param renderer - The renderer to use
 * @param size - The size of the texture to log in the console
 * @ignore
 */
export async function logDebugTexture(texture: Texture, renderer: Renderer, size = 200)
{
    throw new Error("STUB");
}
