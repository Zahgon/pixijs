import { GL_TARGETS } from '../const';

import type { CubeTextureSource } from '../../../shared/texture/sources/CubeTextureSource';
import type { GlRenderingContext } from '../../context/GlRenderingContext';
import type { GlTexture } from '../GlTexture';
import type { GLTextureUploader } from './GLTextureUploader';

const FACE_ORDER: (keyof CubeTextureSource['faces'])[] = ['right', 'left', 'top', 'bottom', 'front', 'back'];

/**
 * Creates a cube uploader that delegates to the given uploader registry.
 * This keeps the uploader map owned by the texture system (better discoverability),
 * while allowing cube uploads to reuse the same 2D upload implementations.
 * @param uploaders - Uploader registry keyed by `uploadMethodId` (must include `image`).
 * @internal
 */
export function createGlUploadCubeTextureResource(
    uploaders: Record<string, GLTextureUploader> & { image: GLTextureUploader }
): GLTextureUploader
{
    throw new Error("STUB");
}
