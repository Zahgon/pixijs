import { ExtensionType } from '../../../extensions/Extensions';
import { Resolver } from '../Resolver';
import { resolveTextureUrl } from './resolveTextureUrl';

import type { ResolveURLParser } from '../types';

/**
 * A parser that will resolve a json urls resolution for spritesheets
 * e.g. `assets/spritesheet@1x.json`
 * @category assets
 * @internal
 */
export const resolveJsonUrl = {
    extension: {
        type: ExtensionType.ResolveParser,
        priority: -2,
        name: 'resolveJson',
    },
    test: (value: string): boolean =>
        { throw new Error("STUB"); },
    parse: resolveTextureUrl.parse,
} satisfies ResolveURLParser;
