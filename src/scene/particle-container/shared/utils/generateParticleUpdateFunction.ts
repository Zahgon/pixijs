import {
    getAttributeInfoFromFormat
} from '../../../../rendering/renderers/shared/geometry/utils/getAttributeInfoFromFormat';

import type { IParticle } from '../Particle';
import type { ParticleRendererProperty } from '../particleData';

// TODO rename to update function
/** @internal */
export type ParticleUpdateFunction = (ps: IParticle[], f32v: Float32Array, u32v: Uint32Array) => void;

/**
 * @param properties
 * @internal
 */
export function generateParticleUpdateFunction(properties: Record<string, ParticleRendererProperty>)
{
    throw new Error("STUB");
}

function generateUpdateFunction(
    properties: Record<string, ParticleRendererProperty>,
    dynamic: boolean
): ParticleUpdateFunction
{
    throw new Error("STUB");
}
