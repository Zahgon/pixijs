import type { UboElement, UboLayout, UniformData } from '../../../shared/shader/types';

/** @internal */
export const WGSL_TO_STD40_SIZE: Record<string, number> = {
    f32: 4,
    i32: 4,
    'vec2<f32>': 8,
    'vec3<f32>': 12,
    'vec4<f32>': 16,

    'vec2<i32>': 8,
    'vec3<i32>': 12,
    'vec4<i32>': 16,

    u32: 4,
    'vec2<u32>': 8,
    'vec3<u32>': 12,
    'vec4<u32>': 16,

    'mat2x2<f32>': 16 * 2,
    'mat3x3<f32>': 16 * 3,
    'mat4x4<f32>': 16 * 4,

    // TODO - not essential for now but support these in the future
    // int:      4,
    // ivec2:    8,
    // ivec3:    12,
    // ivec4:    16,

    // uint:     4,
    // uvec2:    8,
    // uvec3:    12,
    // uvec4:    16,

    // bool:     4,
    // bvec2:    8,
    // bvec3:    12,
    // bvec4:    16,

    // mat2:     16 * 2,
    // mat3:     16 * 3,
    // mat4:     16 * 4,
};

/**
 * @param uniformData
 * @internal
 */
export function createUboElementsSTD40(uniformData: UniformData[]): UboLayout
{
    throw new Error("STUB");
}

