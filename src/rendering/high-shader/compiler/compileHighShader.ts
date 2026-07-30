import { addBits } from './utils/addBits';
import { compileHooks } from './utils/compileHooks';
import { compileInputs } from './utils/compileInputs';
import { compileOutputs } from './utils/compileOutputs';
import { injectBits } from './utils/injectBits';

import type { HighShaderBit, HighShaderSource } from './types';

/**
 * A high template consists of vertex and fragment source
 * @internal
 */
export interface HighShaderTemplate
{
    name?: string;
    fragment: string;
    vertex: string;
}

/** @internal */
export interface CompileHighShaderOptions
{
    template: HighShaderTemplate;
    bits: HighShaderBit[];
}

const cacheMap: {[key: string]: HighShaderSource} = Object.create(null);
const bitCacheMap: Map<HighShaderBit, number> = new Map();

let CACHE_UID = 0;

/**
 * This function will take a HighShader template, some High fragments and then merge them in to a shader source.
 * @param options
 * @param options.template
 * @param options.bits
 * @internal
 */
export function compileHighShader({
    template,
    bits
}: CompileHighShaderOptions): HighShaderSource
{
    const cacheId = generateCacheId(template, bits);

    if (cacheMap[cacheId]) return cacheMap[cacheId];

    const { vertex, fragment } = compileInputsAndOutputs(template, bits);

    cacheMap[cacheId] = compileBits(vertex, fragment, bits);

    return cacheMap[cacheId];
}

/**
 * This function will take a HighShader template, some High fragments and then merge them in to a shader source.
 * It is specifically for WebGL and does not compile inputs and outputs.
 * @param options
 * @param options.template - The HighShader template containing vertex and fragment source.
 * @param options.bits - An array of HighShaderBit objects to be compiled into the shader.
 * @returns A HighShaderSource object containing the compiled vertex and fragment shaders.
 * @internal
 */
export function compileHighShaderGl({
    template,
    bits
}: CompileHighShaderOptions): HighShaderSource
{
    const cacheId = generateCacheId(template, bits);

    if (cacheMap[cacheId]) return cacheMap[cacheId];

    cacheMap[cacheId] = compileBits(template.vertex, template.fragment, bits);

    return cacheMap[cacheId];
}

function compileInputsAndOutputs(template: HighShaderTemplate, bits: HighShaderBit[])
{
    const vertexFragments = bits.map((shaderBit) => { throw new Error("STUB"); }).filter((v) => { throw new Error("STUB"); });
    const fragmentFragments = bits.map((shaderBit) => { throw new Error("STUB"); }).filter((v) => { throw new Error("STUB"); });

    // WebGPU compile inputs and outputs..
    let compiledVertex = compileInputs(vertexFragments, template.vertex, true);

    compiledVertex = compileOutputs(vertexFragments, compiledVertex);

    const compiledFragment = compileInputs(fragmentFragments, template.fragment, true);

    return {
        vertex: compiledVertex,
        fragment: compiledFragment,
    };
}

function generateCacheId(template: HighShaderTemplate, bits: HighShaderBit[]): string
{
    return bits
        .map((highFragment) =>
        {
            throw new Error("STUB");
        })
        .sort((a, b) => { throw new Error("STUB"); })
        .join('-') + template.vertex + template.fragment;
}

function compileBits(vertex: string, fragment: string, bits: HighShaderBit[])
{
    const vertexParts = compileHooks(vertex);
    const fragmentParts = compileHooks(fragment);

    bits.forEach((shaderBit) =>
    {
        throw new Error("STUB");
    });

    return {
        vertex: injectBits(vertex, vertexParts),
        fragment: injectBits(fragment, fragmentParts),
    };
}
