import { ExtensionType } from '../../../extensions/Extensions';

import type { FormatDetectionParser } from '../types';

const imageFormats = ['png', 'jpg', 'jpeg'];

/**
 * Adds some default image formats to the detection parser
 * @category assets
 * @internal
 */
export const detectDefaults = {
    extension: {
        type: ExtensionType.DetectionParser,
        priority: -1,
    },
    test: (): Promise<boolean> => { throw new Error("STUB"); },
    add: async (formats) => { throw new Error("STUB"); },
    remove: async (formats) => { throw new Error("STUB"); },
} as FormatDetectionParser;
