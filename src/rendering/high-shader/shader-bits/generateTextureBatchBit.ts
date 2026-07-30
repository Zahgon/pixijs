import type { HighShaderBit } from '../compiler/types';

const textureBatchBitGpuCache: Record<number, HighShaderBit> = {};

/**
 *
 * @param maxTextures - the max textures the shader can use.
 * @returns a shader bit that will allow the shader to sample multiple textures AND round pixels.
 */
function generateBindingSrc(maxTextures: number): string
{
    throw new Error("STUB");
}

function generateSampleSrc(maxTextures: number): string
{
    throw new Error("STUB");
}

/**
 * @param maxTextures
 * @internal
 */
export function generateTextureBatchBit(maxTextures: number): HighShaderBit
{
    throw new Error("STUB");
}

const textureBatchBitGlCache: Record<number, HighShaderBit> = {};

/**
 *
 * @param maxTextures - the max textures the shader can use.
 * @returns a shader bit that will allow the shader to sample multiple textures AND round pixels.
 */
function generateSampleGlSrc(maxTextures: number): string
{
    throw new Error("STUB");
}

/**
 * @param maxTextures
 * @internal
 */
export function generateTextureBatchBitGl(maxTextures: number): HighShaderBit
{
    throw new Error("STUB");
}
