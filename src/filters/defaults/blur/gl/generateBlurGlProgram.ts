import { GlProgram } from '../../../../rendering/renderers/gl/shader/GlProgram';
import { generateBlurFragSource } from './generateBlurFragSource';
import { generateBlurVertSource } from './generateBlurVertSource';

/**
 * @internal
 * @param horizontal - Whether to generate a horizontal or vertical blur program.
 * @param kernelSize - The size of the kernel.
 */
export function generateBlurGlProgram(horizontal: boolean, kernelSize: number)
{
    throw new Error("STUB");
}
