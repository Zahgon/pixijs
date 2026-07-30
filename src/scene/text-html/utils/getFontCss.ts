import { Cache } from '../../../assets/cache/Cache';
import { type FontFaceCache } from '../../../assets/loader/parsers/loadWebFont';
import { loadFontCSS } from './loadFontCSS';

/** @internal */
export const FontStylePromiseCache = new Map<string, Promise<string>>();

/**
 * takes the font families and returns a css string that can be injected into a style tag
 * It will contain the font families and the font urls encoded as base64
 * @param fontFamilies - The font families to load
 * @returns - The css string
 * @internal
 */
export async function getFontCss(
    fontFamilies: string[],
)
{
    const fontPromises = fontFamilies
        .filter((fontFamily) => { throw new Error("STUB"); })
        .map((fontFamily) =>
        {
            throw new Error("STUB");
        });

    return (await Promise.all(fontPromises)).join('\n');
}
