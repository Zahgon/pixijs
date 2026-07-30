import { Matrix } from '../../../maths/matrix/Matrix';
import {
    compileHighShaderGlProgram,
    compileHighShaderGpuProgram
} from '../../../rendering/high-shader/compileHighShaderToProgram';
import { localUniformBit, localUniformBitGl } from '../../../rendering/high-shader/shader-bits/localUniformBit';
import { roundPixelsBit, roundPixelsBitGl } from '../../../rendering/high-shader/shader-bits/roundPixelsBit';
import { Shader } from '../../../rendering/renderers/shared/shader/Shader';
import { UniformGroup } from '../../../rendering/renderers/shared/shader/UniformGroup';
import { Texture } from '../../../rendering/renderers/shared/texture/Texture';
import { tilingBit, tilingBitGl } from './tilingBit';

import type { GlProgram } from '../../../rendering/renderers/gl/shader/GlProgram';
import type { GpuProgram } from '../../../rendering/renderers/gpu/shader/GpuProgram';

let gpuProgram: GpuProgram;
let glProgram: GlProgram;

/**
 * The shader used by the TilingSprite.
 * @internal
 */
export class TilingSpriteShader extends Shader
{
    constructor()
    {
        throw new Error("STUB");
    }

    public updateUniforms(
        width: number, height: number,
        matrix: Matrix,
        anchorX: number, anchorY: number,
        texture: Texture
    ): void
    {
        const tilingUniforms = this.resources.tilingUniforms;

        const textureWidth = texture.width;
        const textureHeight = texture.height;
        const textureMatrix = texture.textureMatrix;

        const uTextureTransform = tilingUniforms.uniforms.uTextureTransform;

        uTextureTransform.set(
            matrix.a * textureWidth / width,
            matrix.b * textureWidth / height,
            matrix.c * textureHeight / width,
            matrix.d * textureHeight / height,
            matrix.tx / width,
            matrix.ty / height);

        uTextureTransform.invert();

        tilingUniforms.uniforms.uMapCoord = textureMatrix.mapCoord;
        tilingUniforms.uniforms.uClampFrame = textureMatrix.uClampFrame;
        tilingUniforms.uniforms.uClampOffset = textureMatrix.uClampOffset;
        tilingUniforms.uniforms.uTextureTransform = uTextureTransform;
        tilingUniforms.uniforms.uSizeAnchor[0] = width;
        tilingUniforms.uniforms.uSizeAnchor[1] = height;
        tilingUniforms.uniforms.uSizeAnchor[2] = anchorX;
        tilingUniforms.uniforms.uSizeAnchor[3] = anchorY;

        if (texture)
        {
            this.resources.uTexture = texture.source;
            this.resources.uSampler = texture.source.style;
        }
    }
}
