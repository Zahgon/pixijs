import { warn } from '../../../../../utils/logging/warn';
import { TextureSource } from './TextureSource';

import type { TextureSourceOptions } from './TextureSource';

/**
 * The 6 faces of a cube map.
 *
 * Naming matches common engine conventions:
 * - left/right: -X/+X
 * - bottom/top: -Y/+Y
 * - back/front: -Z/+Z
 * @category rendering
 * @advanced
 */
export interface CubeTextureFaces<T>
{
    left: T;
    right: T;
    top: T;
    bottom: T;
    front: T;
    back: T;
}

/**
 * Options for creating a {@link CubeTextureSource}.
 * @category rendering
 * @advanced
 */
export interface CubeTextureSourceOptions extends Omit<
    TextureSourceOptions<any>,
    'resource' | 'width' | 'height' | 'dimensions' | 'viewDimension' | 'resolution' | 'format' | 'alphaMode'
>
{
    /**
     * The 6 face sources that make up the cube texture.
     *
     * All faces must match in:
     * - size (pixelWidth / pixelHeight)
     * - resolution
     * - format
     * - alphaMode
     */
    faces: CubeTextureFaces<TextureSource>;
}

/**
 * A {@link TextureSource} that represents a cube texture (6 faces).
 *
 * Internally, WebGPU uses a 2D texture with 6 array layers and a `cube` view.
 * WebGL uses `TEXTURE_CUBE_MAP`.
 * @example
 * Create a cube source from 6 already-created {@link TextureSource} instances:
 *
 * ```ts
 * const cubeSource = new CubeTextureSource({
 *   faces: { right, left, top, bottom, front, back },
 *   label: 'env-map',
 * });
 * ```
 * @category rendering
 * @advanced
 */
export class CubeTextureSource extends TextureSource<CubeTextureFaces<TextureSource>>
{
    /** @internal */
    public override readonly uploadMethodId = 'cube';

    /** The 6 face sources that make up this cube texture. */
    public readonly faces: CubeTextureFaces<TextureSource>;

    constructor(options: CubeTextureSourceOptions)
    {
        throw new Error("STUB");
    }

    public override destroy(): void
    {
        const faces = this.faces;

        if (faces)
        {
            for (const key of Object.keys(faces) as (keyof CubeTextureFaces<TextureSource>)[])
            {
                const face = faces[key];

                face.off('update', this._onFaceUpdate, this);
                face.off('resize', this._onFaceResize, this);
                face.off('unload', this._onFaceUpdate, this);
            }
        }

        super.destroy();
    }

    private _onFaceUpdate()
    {
        throw new Error("STUB");
    }

    private _onFaceResize(face: TextureSource)
    {
        throw new Error("STUB");
    }

    private static _validateFaces(faces: CubeTextureFaces<TextureSource>): void
    {
        throw new Error("STUB");
    }
}

