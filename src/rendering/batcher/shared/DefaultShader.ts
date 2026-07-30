import { compileHighShaderGlProgram, compileHighShaderGpuProgram } from '../../high-shader/compileHighShaderToProgram';
import { colorBit, colorBitGl } from '../../high-shader/shader-bits/colorBit';
import { generateTextureBatchBit, generateTextureBatchBitGl } from '../../high-shader/shader-bits/generateTextureBatchBit';
import { roundPixelsBit, roundPixelsBitGl } from '../../high-shader/shader-bits/roundPixelsBit';
import { getBatchSamplersUniformGroup } from '../../renderers/gl/shader/getBatchSamplersUniformGroup';
import { Shader } from '../../renderers/shared/shader/Shader';

/**
 * DefaultShader is a specialized shader class designed for batch rendering.
 * It extends the base Shader class and provides functionality for handling
 * color, texture batching, and pixel rounding in both WebGL and WebGPU contexts.
 *
 * It is used by the default batcher
 * @extends Shader
 * @category rendering
 * @advanced
 */
export class DefaultShader extends Shader
{
    /** @internal */
    public maxTextures?: number;

    constructor(maxTextures: number)
    {
        throw new Error("STUB");
    }
}
