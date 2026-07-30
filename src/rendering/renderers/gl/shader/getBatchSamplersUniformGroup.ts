import { UniformGroup } from '../../shared/shader/UniformGroup';

const batchSamplersUniformGroupHash: Record<number, UniformGroup> = {};

/**
 * Automatically generates a uniform group that holds the texture samplers for a shader.
 * This is used mainly by the shaders that batch textures!
 * @param maxTextures - the number of textures that this uniform group will contain.
 * @returns a uniform group that holds the texture samplers.
 * @internal
 */
export function getBatchSamplersUniformGroup(maxTextures: number)
{
    throw new Error("STUB");
}
