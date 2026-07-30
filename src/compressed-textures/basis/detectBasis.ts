import { ExtensionType } from '../../extensions/Extensions';
import { isWebGLSupported } from '../../utils/browser/isWebGLSupported';
import { isWebGPUSupported } from '../../utils/browser/isWebGPUSupported';

import type { FormatDetectionParser } from '../../assets/detections/types';

/**
 * Detects if Basis textures are supported by the browser.
 * This is done by checking if WebGL or WebGPU is supported.
 * If either is supported, Basis textures can be used.
 * @category assets
 * @internal
 */
export const detectBasis = {
    extension: {
        type: ExtensionType.DetectionParser,
        priority: 3,
    },
    test: async (): Promise<boolean> =>
    {
        throw new Error("STUB");
    },
    add: async (formats) => { throw new Error("STUB"); },
    remove: async (formats) => { throw new Error("STUB"); },
} as FormatDetectionParser;
