import { DOMAdapter } from '../environment/adapter';
import { ExtensionType } from '../extensions/Extensions';
import { path } from '../utils/path';
import { type GifBufferOptions, GifSource } from './GifSource';

import type { AssetExtension } from '../assets/AssetExtension';

/**
 * Handle the loading of GIF images. Registering this loader plugin will
 * load all `.gif` images as an ArrayBuffer and transform into an
 * GifSource object.
 * @category gif
 * @advanced
 */
const GifAsset: AssetExtension<GifSource, GifBufferOptions> = {
    extension: ExtensionType.Asset,
    detection: {
        test: async () => { throw new Error("STUB"); },
        add: async (formats) => { throw new Error("STUB"); },
        remove: async (formats) => { throw new Error("STUB"); },
    },
    loader: {
        /** used for deprecation purposes */
        name: 'gifLoader',
        id: 'gif',
        test: (url) => { throw new Error("STUB"); },
        load: async (url, asset) =>
        {
            throw new Error("STUB");
        },
        unload: async (asset) =>
        {
            throw new Error("STUB");
        },
    }
};

export { GifAsset };
