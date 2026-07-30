import type { CanvasSource } from '../../../shared/texture/sources/CanvasSource';
import type { ImageSource } from '../../../shared/texture/sources/ImageSource';
import type { GlRenderingContext } from '../../context/GlRenderingContext';
import type { GlTexture } from '../GlTexture';
import type { GLTextureUploader } from './GLTextureUploader';

/** @internal */
export const glUploadImageResource = {

    id: 'image',

    upload(
        source: ImageSource | CanvasSource,
        glTexture: GlTexture,
        gl: GlRenderingContext,
        webGLVersion: number,
        targetOverride?: number,
        forceAllocation = false
    )
    {
        const target = targetOverride || glTexture.target;

        const textureWidth = source.pixelWidth;
        const textureHeight = source.pixelHeight;

        const resourceWidth = source.resourceWidth;
        const resourceHeight = source.resourceHeight;

        const isWebGL2 = webGLVersion === 2;
        const needsAllocation = forceAllocation || glTexture.width !== textureWidth || glTexture.height !== textureHeight;
        const resourceFitsTexture = resourceWidth >= textureWidth && resourceHeight >= textureHeight;
        const resource = source.resource as TexImageSource;

        const uploadFunction = isWebGL2 ? uploadImageWebGL2 : uploadImageWebGL1;

        uploadFunction(
            gl,
            target,
            glTexture,
            textureWidth,
            textureHeight,
            resourceWidth,
            resourceHeight,
            resource,
            needsAllocation,
            resourceFitsTexture
        );

        glTexture.width = textureWidth;
        glTexture.height = textureHeight;
    }
} as GLTextureUploader;

function uploadImageWebGL2(
    gl: GlRenderingContext,
    target: number,
    glTexture: GlTexture,
    textureWidth: number,
    textureHeight: number,
    resourceWidth: number,
    resourceHeight: number,
    resource: TexImageSource,
    needsAllocation: boolean,
    resourceFitsTexture: boolean
): void
{
    throw new Error("STUB");
}

function uploadImageWebGL1(
    gl: GlRenderingContext,
    target: number,
    glTexture: GlTexture,
    textureWidth: number,
    textureHeight: number,
    _resourceWidth: number,
    _resourceHeight: number,
    resource: TexImageSource,
    needsAllocation: boolean,
    resourceFitsTexture: boolean
): void
{
    throw new Error("STUB");
}
