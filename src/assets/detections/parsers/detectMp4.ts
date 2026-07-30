import { ExtensionType } from '../../../extensions/Extensions';
import { testVideoFormat } from '../utils/testVideoFormat';

import type { FormatDetectionParser } from '../types';

/**
 * Detects if the browser supports the MP4 video format.
 * @category assets
 * @internal
 */
export const detectMp4 = {
    extension: {
        type: ExtensionType.DetectionParser,
        priority: 0,
    },
    test: async (): Promise<boolean> => { throw new Error("STUB"); },
    add: async (formats) => { throw new Error("STUB"); },
    remove: async (formats) => { throw new Error("STUB"); },
} as FormatDetectionParser;
