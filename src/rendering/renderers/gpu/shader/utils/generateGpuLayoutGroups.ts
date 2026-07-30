import { ShaderStage } from '../../../shared/shader/const';

import type { ProgramPipelineLayoutDescription } from '../GpuProgram';
import type { StructsAndGroups } from './extractStructAndGroups';

/**
 * @param root0
 * @param root0.groups
 * @internal
 */
export function generateGpuLayoutGroups({ groups }: StructsAndGroups): ProgramPipelineLayoutDescription
{
    throw new Error("STUB");
}
