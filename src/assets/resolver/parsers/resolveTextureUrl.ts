import { ExtensionType } from '../../../extensions/Extensions';
import { loadTextures } from '../../loader/parsers/textures/loadTextures';
import { Resolver } from '../Resolver';

import type { ResolveURLParser } from '../types';

/**
 * A parser that will resolve a texture url
 * @category assets
 * @internal
 */
export const resolveTextureUrl = {
    extension: {
        type: ExtensionType.ResolveParser,
        name: 'resolveTexture',
    },
    test: loadTextures.test,
    parse: (value: string) =>
        { throw new Error("STUB"); },
} satisfies ResolveURLParser;
