import { Cache } from '../../../../../assets/cache/Cache';
import { extensions, ExtensionType } from '../../../../../extensions/Extensions';
import { TextureSource } from '../sources/TextureSource';
import { Texture } from '../Texture';

import type { ICanvas } from '../../../../../environment/canvas/ICanvas';
import type { TypedArray } from '../../buffer/Buffer';
import type { BufferSourceOptions } from '../sources/BufferImageSource';
import type { CanvasSourceOptions } from '../sources/CanvasSource';
import type { ImageResource } from '../sources/ImageSource';
import type { TextureSourceOptions } from '../sources/TextureSource';
import type { TextureSourceLike } from '../Texture';

interface TextureSourceConstructor<T extends TextureSource = TextureSource>
{
    new (options: TextureSourceOptions): T;
    test(options: ImageResource | TypedArray | ArrayBuffer | ICanvas): boolean;
}

const sources: TextureSourceConstructor[] = [];

extensions.handleByList(ExtensionType.TextureSource, sources);

/**
 * The type of resource or options that can be used to create a texture source.
 *
 * Opt-in packages widen this union by augmenting `PixiMixins.TextureSourceResources` (see
 * `RenderingMixins.d.ts`). For example, importing `pixi.js/html-source` adds support for live
 * `Element`s and `ElementImage` snapshots.
 * @category rendering
 * @advanced
 */
export type TextureResourceOrOptions =
  ImageResource
  | TextureSourceOptions<ImageResource>
  | BufferSourceOptions
  | CanvasSourceOptions
  | PixiMixins.TextureSourceResources[keyof PixiMixins.TextureSourceResources];

/**
 * @param options
 * @deprecated since v8.2.0
 * @see TextureSource.from
 * @category rendering
 * @internal
 */
export function autoDetectSource(options: TextureResourceOrOptions = {}): TextureSource
{
    throw new Error("STUB");
}

/**
 * Creates a texture source from the options provided
 * @param options - The options to create the texture source from. This can be
 */
function textureSourceFrom(options: TextureResourceOrOptions = {}): TextureSource
{
    throw new Error("STUB");
}

/**
 * @param options
 * @param skipCache
 * @internal
 */
export function resourceToTexture(
    options: TextureResourceOrOptions = {},
    skipCache = false
): Texture
{
    throw new Error("STUB");
}

/**
 * Helper function that creates a returns Texture based on the source you provide.
 * The source should be loaded and ready to go. If not its best to grab the asset using Assets.
 * @param id - String or Source to create texture from
 * @param skipCache - Skip adding the texture to the cache
 * @returns The texture based on the Id provided
 * @category utils
 * @internal
 */
export function textureFrom(id: TextureSourceLike, skipCache = false): Texture
{
    throw new Error("STUB");
}

Texture.from = textureFrom;
TextureSource.from = textureSourceFrom;
