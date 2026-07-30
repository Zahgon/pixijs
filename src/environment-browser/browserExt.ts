import { ExtensionType } from '../extensions/Extensions';

/**
 * Extension for the browser environment.
 * @category environment
 * @internal
 */
export const browserExt = {
    extension: {
        type: ExtensionType.Environment,
        name: 'browser',
        priority: -1,
    },
    test: () => { throw new Error("STUB"); },
    load: async () =>
    {
        throw new Error("STUB");
    },
};
