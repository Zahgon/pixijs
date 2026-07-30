import { getAttributeInfoFromFormat } from '../../rendering/renderers/shared/geometry/utils/getAttributeInfoFromFormat';
import { particleUpdateFunctions } from './particleUpdateFunctions';

import type { IParticle } from '../../scene/particle-container/shared/Particle';
import type { ParticleRendererProperty } from '../../scene/particle-container/shared/particleData';

// eslint-disable-next-line max-len
type ParticleUpdateFunction = (ps: IParticle[], f32v: Float32Array, u32v: Uint32Array, offset: number, stride: number) => void;

/**
 * @param properties
 * @internal
 */
export function generateParticleUpdatePolyfill(properties: Record<string, ParticleRendererProperty>)
{
    throw new Error("STUB");
}

function generateUpdateFunction(properties: ParticleRendererProperty[]): ParticleUpdateFunction
{
    throw new Error("STUB");
}
