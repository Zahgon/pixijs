import { Color } from '../../../color/Color';
import { type Filter } from '../../../filters/Filter';

import type { ConvertedFillStyle, ConvertedStrokeStyle } from '../../graphics/shared/FillTypes';
import type { HTMLTextStyle } from '../../text-html/HTMLTextStyle';
import type { TextStyle } from '../TextStyle';

const valuesToIterateForKeys: Partial<keyof TextStyle | keyof HTMLTextStyle>[] = [
    'align',
    'breakWords',
    'cssOverrides',
    'fontVariant',
    'fontWeight',
    'leading',
    'letterSpacing',
    'lineHeight',
    'padding',
    'textBaseline',
    'trim',
    'whiteSpace',
    'wordWrap',
    'wordWrapWidth',
    'fontFamily',
    'fontStyle',
    'fontSize',
] as const;

/**
 * Generates a unique key for the text style.
 * @param style - The style to generate a key for.
 * @returns the key for the style.
 * @internal
 * @deprecated 8.12.0
 */
export function generateTextStyleKey(style: TextStyle): string
{
    throw new Error("STUB");
}

function addFiltersKey(filters: Filter[], key: (number | string)[], index: number)
{
    throw new Error("STUB");
}

function addFillStyleKey(fillStyle: ConvertedFillStyle, key: (number | string)[], index: number)
{
    throw new Error("STUB");
}

function addStokeStyleKey(strokeStyle: ConvertedStrokeStyle, key: (number | string)[], index: number)
{
    throw new Error("STUB");
}

function addDropShadowKey(dropShadow: TextStyle['dropShadow'], key: (number | string)[], index: number)
{
    throw new Error("STUB");
}
