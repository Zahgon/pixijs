import { ExtensionType } from '../../../extensions/Extensions';
import { testVideoFormat } from '../utils/testVideoFormat';

import type { FormatDetectionParser } from '../types';

/**
 * Detects if the browser supports the WebM video format.
 * @category assets
 * @internal
 */
export const detectWebm = {
    extension: {
        type: ExtensionType.DetectionParser,
        priority: 0,
    },
    test: async (): Promise<boolean> => { throw new Error("STUB"); },
    add: async (formats) => { throw new Error("STUB"); },
    remove: async (formats) => { throw new Error("STUB"); },
} as FormatDetectionParser;
