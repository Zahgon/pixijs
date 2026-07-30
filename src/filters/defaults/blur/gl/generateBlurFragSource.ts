import { GAUSSIAN_VALUES } from '../const';

const fragTemplate = [
    'in vec2 vBlurTexCoords[%size%];',
    'uniform sampler2D uTexture;',
    'out vec4 finalColor;',

    'void main(void)',
    '{',
    '    %blur%',
    '}',

].join('\n');

/**
 * @internal
 * @param kernelSize - The size of the kernel.
 */
export function generateBlurFragSource(kernelSize: number): string
{
    throw new Error("STUB");
}
