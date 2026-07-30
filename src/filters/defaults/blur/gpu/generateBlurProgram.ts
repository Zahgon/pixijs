import { GpuProgram } from '../../../../rendering/renderers/gpu/shader/GpuProgram';
import { GAUSSIAN_VALUES } from '../const';
import source from './blur-template.wgsl';

/**
 * @internal
 * @param horizontal - Whether to generate a horizontal or vertical blur program.
 * @param kernelSize - The size of the kernel.
 */
export function generateBlurProgram(horizontal: boolean, kernelSize: number)
{
    throw new Error("STUB");
}

