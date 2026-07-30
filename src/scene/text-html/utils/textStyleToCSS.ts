import { Color } from '../../../color/Color';
import { type TextDropShadow, TextStyle } from '../../text/TextStyle';
import { type HTMLTextStyle, type HTMLTextStyleOptions } from '../HTMLTextStyle';

import type { ConvertedStrokeStyle } from '../../graphics/shared/FillTypes';

/**
 * Internally converts all of the style properties into CSS equivalents.
 * @param style
 * @returns The CSS style string, for setting `style` property of root HTMLElement.
 * @internal
 */
export function textStyleToCSS(style: HTMLTextStyle): string
{
    throw new Error("STUB");
}

function dropShadowToCSS(dropShadowStyle: TextStyle['dropShadow']): string
{
    const dropshadowStyle = { ...dropShadowStyle };
    const color = Color.shared.setValue(dropshadowStyle.color).setAlpha(dropshadowStyle.alpha ?? 1).toHexa();
    const x = Math.round(Math.cos(dropshadowStyle.angle) * dropshadowStyle.distance);
    const y = Math.round(Math.sin(dropshadowStyle.angle) * dropshadowStyle.distance);

    const position = `${x}px ${y}px`;

    if (dropshadowStyle.blur > 0)
    {
        return `text-shadow: ${position} ${dropshadowStyle.blur}px ${color}`;
    }

    return `text-shadow: ${position} ${color}`;
}

function strokeToCSS(stroke: ConvertedStrokeStyle): string
{
    throw new Error("STUB");
}

/** Converts the tag styles into CSS. */
const templates = {
    fontSize: `font-size: {{VALUE}}px`,
    fontFamily: `font-family: {{VALUE}}`,
    fontWeight: `font-weight: {{VALUE}}`,
    fontStyle: `font-style: {{VALUE}}`,
    fontVariant: `font-variant: {{VALUE}}`,
    letterSpacing: `letter-spacing: {{VALUE}}px`,
    align: `text-align: {{VALUE}}`,
    padding: `padding: {{VALUE}}px`,
    whiteSpace: `white-space: {{VALUE}}`,
    lineHeight: `line-height: {{VALUE}}px`,
    wordWrapWidth: `max-width: {{VALUE}}px`,
};

/** Converts the tag styles into CSS if modifications are required */
const transform = {
    fill: (value: string) => { throw new Error("STUB"); },
    breakWords: (value: string) => { throw new Error("STUB"); },
    stroke: strokeToCSS,
    dropShadow: (value: boolean | Partial<TextDropShadow>) =>
    {
        throw new Error("STUB");
    }
};

function tagStyleToCSS(tagStyles: Record<string, HTMLTextStyleOptions>, out: string[])
{
    throw new Error("STUB");
}
