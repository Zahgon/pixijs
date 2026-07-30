import { Color } from '../../../../color/Color';
import { Matrix } from '../../../../maths/matrix/Matrix';
import { GlProgram } from '../../../../rendering/renderers/gl/shader/GlProgram';
import { GpuProgram } from '../../../../rendering/renderers/gpu/shader/GpuProgram';
import { Shader } from '../../../../rendering/renderers/shared/shader/Shader';
import { Texture } from '../../../../rendering/renderers/shared/texture/Texture';
import { TextureStyle } from '../../../../rendering/renderers/shared/texture/TextureStyle';
import fragment from './particles.frag';
import vertex from './particles.vert';
import wgsl from './particles.wgsl';

/** @internal */
export class ParticleShader extends Shader
{
    constructor()
    {
        throw new Error("STUB");
    }
}
