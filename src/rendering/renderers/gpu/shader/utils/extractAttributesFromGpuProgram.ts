import { getAttributeInfoFromFormat } from '../../../shared/geometry/utils/getAttributeInfoFromFormat';

import type { ExtractedAttributeData } from '../../../gl/shader/program/extractAttributesFromGlProgram';
import type { VertexFormat } from '../../../shared/geometry/const';
import type { ProgramSource } from '../GpuProgram';

const WGSL_TO_VERTEX_TYPES: Record<string, VertexFormat> = {

    f32:  'float32',
    'vec2<f32>': 'float32x2',
    'vec3<f32>': 'float32x3',
    'vec4<f32>': 'float32x4',
    vec2f: 'float32x2',
    vec3f: 'float32x3',
    vec4f: 'float32x4',

    i32: 'sint32',
    'vec2<i32>': 'sint32x2',
    'vec3<i32>': 'sint32x3',
    'vec4<i32>': 'sint32x4',
    vec2i: 'sint32x2',
    vec3i: 'sint32x3',
    vec4i: 'sint32x4',

    u32: 'uint32',
    'vec2<u32>': 'uint32x2',
    'vec3<u32>': 'uint32x3',
    'vec4<u32>': 'uint32x4',
    vec2u: 'uint32x2',
    vec3u: 'uint32x3',
    vec4u: 'uint32x4',

    bool: 'uint32',
    'vec2<bool>': 'uint32x2',
    'vec3<bool>': 'uint32x3',
    'vec4<bool>': 'uint32x4',
};

/** Regex to match \@location decorated fields */
const LOCATION_REGEX = /@location\((\d+)\)\s+([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_<>]+)(?:,|\s|\)|$)/g;

/**
 * Parses \@location attributes from a string and populates results.
 * @param str - String to search for \@location patterns
 * @param results - Results object to populate
 */
function parseLocations(str: string, results: Record<string, ExtractedAttributeData>): void
{
    throw new Error("STUB");
}

/**
 * Strips comments from WGSL source code.
 * @param source - WGSL source code
 * @returns Source with comments removed
 */
function stripComments(source: string): string
{
    throw new Error("STUB");
}

/**
 * Extracts vertex attributes from a WGSL shader program.
 *
 * Supports two styles:
 * 1. Inline \@location decorators in function parameters
 * 2. Struct-based input where \@location decorators are in the struct definition
 * @param root0
 * @param root0.source
 * @param root0.entryPoint
 * @internal
 */
export function extractAttributesFromGpuProgram(
    { source, entryPoint }: ProgramSource
): Record<string, ExtractedAttributeData>
{
    throw new Error("STUB");
}
