import { ExtensionType } from '../extensions/Extensions';

/**
 * Extension for the webworker environment.
 * @category environment
 * @internal
 */
export const webworkerExt = {
    extension: {
        type: ExtensionType.Environment,
        name: 'webworker',
        priority: 0,
    },
    test: () => { throw new Error("STUB"); },
    load: async () =>
    {
        throw new Error("STUB");
    },
};
