import { ExtensionType } from '../../../extensions/Extensions';
import { testImageFormat } from '../utils/testImageFormat';

import type { FormatDetectionParser } from '../types';

/**
 * Detects if the browser supports the WebP image format.
 * @category assets
 * @internal
 */
export const detectWebp = {
    extension: {
        type: ExtensionType.DetectionParser,
        priority: 0,
    },
    test: async (): Promise<boolean> => { throw new Error("STUB"); },
    add: async (formats) => { throw new Error("STUB"); },
    remove: async (formats) => { throw new Error("STUB"); },
} as FormatDetectionParser;
