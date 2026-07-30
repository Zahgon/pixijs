import { ExtensionType } from '../../../extensions/Extensions';
import { Texture } from '../../../rendering/renderers/shared/texture/Texture';

import type { CacheParser } from '../CacheParser';

/**
 * Returns an object of textures from an array of textures to be cached
 * @category assets
 * @internal
 */
export const cacheTextureArray: CacheParser<Texture[]> = {
    extension: {
        type: ExtensionType.CacheParser,
        name: 'cacheTextureArray',
    },

    test: (asset: any[]) => { throw new Error("STUB"); },

    getCacheableAssets: (keys: string[], asset: Texture[]) =>
    {
        throw new Error("STUB");
    }
};
