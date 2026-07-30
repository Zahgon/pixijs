import { Resolver } from '../../assets/resolver/Resolver';
import { checkExtension } from '../../assets/utils/checkExtension';
import { ExtensionType } from '../../extensions/Extensions';

import type { ResolveURLParser } from '../../assets/resolver/types';

/** @internal */
export const validFormats = ['basis', 'bc7', 'bc6h', 'astc', 'etc2', 'bc5', 'bc4', 'bc3', 'bc2', 'bc1', 'eac'];

/**
 * A parser that will resolve a compressed texture url
 * @category assets
 * @internal
 */
export const resolveCompressedTextureUrl = {
    extension: ExtensionType.ResolveParser,
    test: (value: string) =>
        { throw new Error("STUB"); },
    parse: (value: string) =>
    {
        throw new Error("STUB");
    }
} satisfies ResolveURLParser;
