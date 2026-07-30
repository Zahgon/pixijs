import { GlProgram } from '../../rendering/renderers/gl/shader/GlProgram';
import { GpuProgram } from '../../rendering/renderers/gpu/shader/GpuProgram';
import { UniformGroup } from '../../rendering/renderers/shared/shader/UniformGroup';
import { Texture } from '../../rendering/renderers/shared/texture/Texture';
import { Filter } from '../Filter';
import blendTemplateFrag from './blend-template.frag';
import blendTemplateVert from './blend-template.vert';
import blendTemplate from './blend-template.wgsl';

/** @internal */
export interface BlendModeFilterOptions
{
    source?: string;
    gpu?: {
        functions?: string;
        main?: string;
    }
    gl?: {
        functions?: string;
        main?: string;
    }
}

/** @internal */
export class BlendModeFilter extends Filter
{
    constructor(options: BlendModeFilterOptions)
    {
        throw new Error("STUB");
    }
}

function compileBlendModeShader(options: {source: string, functions?: string, main?: string}): string
{
    throw new Error("STUB");
}
