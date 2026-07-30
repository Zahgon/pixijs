import type { IParticle } from '../../scene/particle-container/shared/Particle';

/** @internal */
export const particleUpdateFunctions = {
    aVertex: (ps: IParticle[], f32v: Float32Array, _u32v: Uint32Array, offset: number, stride: number) =>
    {
        throw new Error("STUB");
    },
    aPosition: (ps: IParticle[], f32v: Float32Array, _u32v: Uint32Array, offset: number, stride: number) =>
    {
        throw new Error("STUB");
    },
    aRotation: (ps: IParticle[], f32v: Float32Array, _u32v: Uint32Array, offset: number, stride: number) =>
    {
        throw new Error("STUB");
    },
    aUV: (ps: IParticle[], f32v: Float32Array, _u32v: Uint32Array, offset: number, stride: number) =>
    {
        throw new Error("STUB");
    },
    aColor: (ps: IParticle[], _f32v: Float32Array, u32v: Uint32Array, offset: number, stride: number) =>
    {
        throw new Error("STUB");
    }
};
