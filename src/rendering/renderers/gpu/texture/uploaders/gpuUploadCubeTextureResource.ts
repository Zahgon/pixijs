import type { CubeTextureSource } from '../../../shared/texture/sources/CubeTextureSource';
import type { GPU } from '../../GpuDeviceSystem';
import type { GpuTextureUploader } from './GpuTextureUploader';

const FACE_ORDER: (keyof CubeTextureSource['faces'])[] = ['right', 'left', 'top', 'bottom', 'front', 'back'];

/**
 * Creates a cube uploader that delegates to the given uploader registry.
 * @param uploaders - Uploader registry keyed by `uploadMethodId` (must include `image`).
 * @internal
 */
export function createGpuUploadCubeTextureResource(
    uploaders: Record<string, GpuTextureUploader> & { image: GpuTextureUploader }
): GpuTextureUploader<CubeTextureSource>
{
    throw new Error("STUB");
}

