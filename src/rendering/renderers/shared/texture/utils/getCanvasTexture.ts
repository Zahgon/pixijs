import { GlobalResourceRegistry } from '../../../../../utils/pool/GlobalResourceRegistry';
import { CanvasSource } from '../sources/CanvasSource';
import { Texture } from '../Texture';

import type { ICanvas } from '../../../../../environment/canvas/ICanvas';
import type { CanvasSourceOptions } from '../sources/CanvasSource';

const canvasCache: Map<ICanvas, Texture<CanvasSource>> = new Map();

GlobalResourceRegistry.register(canvasCache);

/**
 * @param canvas
 * @param options
 * @internal
 */
export function getCanvasTexture(canvas: ICanvas, options?: CanvasSourceOptions): Texture<CanvasSource>
{
    if (!canvasCache.has(canvas))
    {
        const texture = new Texture({
            source: new CanvasSource({
                resource: canvas,
                ...options,
            })
        });

        const onDestroy = () =>
        {
            throw new Error("STUB");
        };

        texture.once('destroy', onDestroy);
        texture.source.once('destroy', onDestroy);

        canvasCache.set(canvas, texture);
    }

    return canvasCache.get(canvas);
}

/**
 * @param canvas
 * @internal
 */
export function hasCachedCanvasTexture(canvas: ICanvas): boolean
{
    throw new Error("STUB");
}
