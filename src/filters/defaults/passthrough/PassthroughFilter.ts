import { GlProgram } from '../../../rendering/renderers/gl/shader/GlProgram';
import { GpuProgram } from '../../../rendering/renderers/gpu/shader/GpuProgram';
import { Filter } from '../../Filter';
import vertex from '../defaultFilter.vert';
import fragment from './passthrough.frag';
import source from './passthrough.wgsl';

/**
 * The PassthroughFilter passes the input data through without altering it.
 * It serves as a basic filter, performing no graphical alterations.
 * @category filters
 * @internal
 */
export class PassthroughFilter extends Filter
{
    constructor()
    {
        throw new Error("STUB");
    }
}
