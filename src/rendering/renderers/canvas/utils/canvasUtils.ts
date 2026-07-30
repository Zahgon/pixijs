import { Color } from '../../../../color/Color';
import { DOMAdapter } from '../../../../environment/adapter';
import { groupD8 } from '../../../../maths/matrix/groupD8';
import { canUseNewCanvasBlendModes } from './canUseNewCanvasBlendModes';

import type { ICanvas } from '../../../../environment/canvas/ICanvas';
import type { ICanvasRenderingContext2D } from '../../../../environment/canvas/ICanvasRenderingContext2D';
import type { ImageLike } from '../../../../environment/ImageLike';
import type { TextureSource } from '../../shared/texture/sources/TextureSource';
import type { Texture } from '../../shared/texture/Texture';

type TintCache = Record<string, (ICanvas & { tintId?: number }) | (ImageLike & { tintId?: number })>;
type CanvasSourceCache = {
    canvas: ICanvas;
    resourceId: number;
};

/**
 * Canvas helper utilities for tinting and pattern generation.
 * @internal
 */
export const canvasUtils = {
    canvas: null as ICanvas | null,
    convertTintToImage: false,
    cacheStepsPerColorChannel: 8,
    canUseMultiply: canUseNewCanvasBlendModes(),
    tintMethod: null as (texture: Texture, color: number, canvas: ICanvas) => void,
    _canvasSourceCache: new WeakMap<TextureSource, CanvasSourceCache>(),
    _unpremultipliedCache: new WeakMap<TextureSource, CanvasSourceCache>(),
    getCanvasSource: (texture: Texture): CanvasImageSource | null =>
    {
        throw new Error("STUB");
    },

    getTintedCanvas: (sprite: { texture: Texture }, color: number): ICanvas | ImageLike =>
    {
        throw new Error("STUB");
    },

    getTintedPattern: (texture: Texture, color: number): CanvasPattern =>
    {
        throw new Error("STUB");
    },

    /**
     * Applies a transform to a CanvasPattern.
     * @param pattern - The pattern to apply the transform to.
     * @param matrix - The matrix to apply.
     * @param matrix.a
     * @param matrix.b
     * @param matrix.c
     * @param matrix.d
     * @param matrix.tx
     * @param matrix.ty
     * @param invert
     */
    applyPatternTransform: (
        pattern: CanvasPattern,
        matrix: {
            a: number,
            b: number,
            c: number,
            d: number,
            tx: number,
            ty: number
        },
        invert = true
    ): void =>
    {
        throw new Error("STUB");
    },

    tintWithMultiply: (texture: Texture, color: number, canvas: ICanvas): void =>
    {
        throw new Error("STUB");
    },

    tintWithOverlay: (texture: Texture, color: number, canvas: ICanvas): void =>
    {
        throw new Error("STUB");
    },

    tintWithPerPixel: (texture: Texture, color: number, canvas: ICanvas): void =>
    {
        throw new Error("STUB");
    },

    /**
     * Applies inverse rotation transform to context for texture packer rotation compensation.
     * Supports all 16 groupD8 symmetries (rotations and reflections).
     * @param context - Canvas 2D context
     * @param rotate - The groupD8 rotation value
     * @param srcWidth - Source crop width (before rotation)
     * @param srcHeight - Source crop height (before rotation)
     */
    _applyInverseRotation: (
        context: ICanvasRenderingContext2D,
        rotate: number,
        srcWidth: number,
        srcHeight: number
    ): void =>
    {
        throw new Error("STUB");
    },
};

canvasUtils.tintMethod = canvasUtils.canUseMultiply ? canvasUtils.tintWithMultiply : canvasUtils.tintWithPerPixel;
