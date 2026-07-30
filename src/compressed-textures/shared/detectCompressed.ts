import { ExtensionType } from '../../extensions/Extensions';
// eslint-disable-next-line max-len
import { getSupportedCompressedTextureFormats } from '../../rendering/renderers/shared/texture/utils/getSupportedCompressedTextureFormats';
import { isWebGLSupported } from '../../utils/browser/isWebGLSupported';
import { isWebGPUSupported } from '../../utils/browser/isWebGPUSupported';
import { validFormats } from './resolveCompressedTextureUrl';

import type { FormatDetectionParser } from '../../assets/detections/types';
import type { TEXTURE_FORMATS } from '../../rendering/renderers/shared/texture/const';

let compressedTextureExtensions: string[];

/**
 * Detects if the browser supports compressed texture formats.
 * @category assets
 * @internal
 */
export const detectCompressed = {
    extension: {
        type: ExtensionType.DetectionParser,
        priority: 2,
    },
    test: async (): Promise<boolean> =>
    {
        throw new Error("STUB");
    },
    add: async (formats: string[]): Promise<string[]> =>
    {
        throw new Error("STUB");
    },
    remove: async (formats: string[]): Promise<string[]> =>
    {
        throw new Error("STUB");
    },
} as FormatDetectionParser;

function extractExtensionsForCompressedTextureFormats(formats: TEXTURE_FORMATS[]): string[]
{
    const extensions: string[] = ['basis'];

    const dupeMap: Record<string, boolean> = {};

    formats.forEach((format) =>
    {
        throw new Error("STUB");
    });

    // sort extensions by priority
    extensions.sort((a, b) =>
    {
        throw new Error("STUB");
    });

    return extensions;
}
