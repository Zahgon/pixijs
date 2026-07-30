import { isWebGLSupported } from '../../../../../utils/browser/isWebGLSupported';
import { isWebGPUSupported } from '../../../../../utils/browser/isWebGPUSupported';
import { getSupportedGlCompressedTextureFormats } from '../../../gl/texture/utils/getSupportedGlCompressedTextureFormats';
import { getSupportedGPUCompressedTextureFormats } from '../../../gpu/texture/utils/getSupportedGPUCompressedTextureFormats';

import type { TEXTURE_FORMATS } from '../const';

let supportedCompressedTextureFormats: TEXTURE_FORMATS[];

/** @internal */
export async function getSupportedCompressedTextureFormats(): Promise<TEXTURE_FORMATS[]>
{
    if (supportedCompressedTextureFormats !== undefined) return supportedCompressedTextureFormats;

    supportedCompressedTextureFormats = await (async (): Promise<TEXTURE_FORMATS[]> =>
    {
        throw new Error("STUB");
    })();

    return supportedCompressedTextureFormats;
}
