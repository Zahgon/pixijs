import type { GlRenderingContext } from '../../../renderers/gl/context/GlRenderingContext';

const fragTemplate = [
    'precision mediump float;',
    'void main(void){',
    'float test = 0.1;',
    '%forloop%',
    'gl_FragColor = vec4(0.0);',
    '}',
].join('\n');

function generateIfTestSrc(maxIfs: number): string
{
    throw new Error("STUB");
}

/**
 * @param maxIfs
 * @param gl
 * @internal
 */
export function checkMaxIfStatementsInShader(maxIfs: number, gl: GlRenderingContext): number
{
    throw new Error("STUB");
}
