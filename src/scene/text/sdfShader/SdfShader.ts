import { Matrix } from '../../../maths/matrix/Matrix';
import {
    compileHighShaderGlProgram,
    compileHighShaderGpuProgram
} from '../../../rendering/high-shader/compileHighShaderToProgram';
import { colorBit, colorBitGl } from '../../../rendering/high-shader/shader-bits/colorBit';
import {
    generateTextureBatchBit,
    generateTextureBatchBitGl
} from '../../../rendering/high-shader/shader-bits/generateTextureBatchBit';
import { roundPixelsBit, roundPixelsBitGl } from '../../../rendering/high-shader/shader-bits/roundPixelsBit';
import { getBatchSamplersUniformGroup } from '../../../rendering/renderers/gl/shader/getBatchSamplersUniformGroup';
import { Shader } from '../../../rendering/renderers/shared/shader/Shader';
import { UniformGroup } from '../../../rendering/renderers/shared/shader/UniformGroup';
import { localUniformMSDFBit, localUniformMSDFBitGl } from './shader-bits/localUniformMSDFBit';
import { mSDFBit, mSDFBitGl } from './shader-bits/mSDFBit';

import type { GlProgram } from '../../../rendering/renderers/gl/shader/GlProgram';
import type { GpuProgram } from '../../../rendering/renderers/gpu/shader/GpuProgram';

let gpuProgram: GpuProgram;
let glProgram: GlProgram;

/** @internal */
export class SdfShader extends Shader
{
    constructor(maxTextures: number)
    {
        throw new Error("STUB");
    }
}
