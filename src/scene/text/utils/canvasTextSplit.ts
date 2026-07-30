import { Matrix } from '../../../maths/matrix/Matrix';
import { Container } from '../../container/Container';
import { FillGradient } from '../../graphics/shared/fill/FillGradient';
import { type SplitOptions } from '../../text-split/SplitText';
import { type TextSplitOutput } from '../../text-split/types';
import { CanvasTextGenerator } from '../canvas/CanvasTextGenerator';
import { CanvasTextMetrics } from '../canvas/CanvasTextMetrics';
import { type TextStyleRun } from '../canvas/utils/parseTaggedText';
import { Text } from '../Text';
import { type TextStyle } from '../TextStyle';

interface GroupedSegment
{
    line: string;
    chars: string[];
}

function getAlignmentOffset(alignment: string, lineWidth: number, largestLine: number): number
{
    switch (alignment)
    {
        case 'center':
            return (largestLine - lineWidth) / 2;
        case 'right':
            return largestLine - lineWidth;
        case 'left':
        default:
            return 0;
    }
}

function isNewlineCharacter(char: string): boolean
{
    return char === '\r' || char === '\n' || char === '\r\n';
}

const whitespaceRegex = /^\s*$/;

/**
 * Groups text segments into lines based on measured text metrics
 * @param segments - Array of text segments to group
 * @param measuredText - The pre-measured text metrics
 * @param measuredText.lines
 * @returns Array of grouped segments containing line information
 */
function groupTextSegments(
    segments: string[],
    measuredText: { lines: string[] },
): GroupedSegment[]
{
    const groupedSegments: GroupedSegment[] = [];
    let currentLine = measuredText.lines[0];
    let matchedLine = '';
    let chars: string[] = [];
    let lineCount = 0;

    segments.forEach((segment) =>
    {
        throw new Error("STUB");
    });

    return groupedSegments;
}

/**
 * Splits a Text object into segments based on the text's layout and style,
 * and adds these segments as individual Text objects to a specified container.
 *
 * This function handles word wrapping, alignment, and letter spacing,
 * ensuring that each segment is rendered correctly according to the original text's style.
 * It uses the CanvasTextMetrics to measure text dimensions and segment the text into lines.
 * @param options - Configuration options for the text split operation.
 * @returns An array of Text objects representing the split segments.
 * @internal
 */
export function canvasTextSplit(
    options: Pick<SplitOptions, 'text' | 'style'> & { chars: Text[] },
): TextSplitOutput<Text>
{
    const { text, style, chars: existingChars } = options;
    const textStyle = style as TextStyle;

    // measure the entire text to get the layout
    const measuredText = CanvasTextMetrics.measureText(text, textStyle);

    if (measuredText.runsByLine && measuredText.runsByLine.length > 0)
    {
        return canvasTaggedTextSplitFromRuns(measuredText, textStyle, existingChars, text);
    }

    // split the text into segments
    const segments = CanvasTextMetrics.graphemeSegmenter(text);
    // now group the segments into lines based on measured lines
    const groupedSegments: GroupedSegment[] = groupTextSegments(segments, measuredText);

    const alignment = textStyle.align;
    const maxLineWidth = measuredText.lineWidths.reduce((max, line) => { throw new Error("STUB"); }, 0);

    // Check if fill or stroke contains a gradient that needs offset/bounds
    const fillGradient = textStyle._fill?.fill;
    const strokeGradient = textStyle._stroke?.fill;

    const hasFillGradient = fillGradient instanceof FillGradient;
    const hasStrokeGradient = strokeGradient instanceof FillGradient;
    const hasGradient = hasFillGradient || hasStrokeGradient;
    const hasLocalGradient = (hasFillGradient && fillGradient.textureSpace === 'local')
        || (hasStrokeGradient && strokeGradient.textureSpace === 'local');

    // Store full text dimensions for gradient calculation
    const fullTextWidth = measuredText.width;
    const fullTextHeight = measuredText.height;

    // Clone style for individual characters with left alignment.
    // Container-level positioning handles alignment via getAlignmentOffset().
    // Without this, each character applies its own alignment offset within its measurement area.
    const baseCharStyle = textStyle.clone();

    baseCharStyle.align = 'left';

    // When trim is enabled on the style, calculate the trim offset for the whole text block once,
    // then disable trim on individual characters and offset all characters to compensate
    let trimOffsetX = 0;
    let trimOffsetY = 0;

    if (baseCharStyle.trim)
    {
        const { frame, canvasAndContext } = CanvasTextGenerator.getCanvasAndContext({
            text,
            style: textStyle,
            resolution: 1,
        });

        CanvasTextGenerator.returnCanvasAndContext(canvasAndContext);

        trimOffsetX = -frame.x;
        trimOffsetY = -frame.y;

        // Disable trim for individual characters; we'll use the whole-text trim offset instead
        baseCharStyle.trim = false;
    }

    // now create Text objects for each segment and add them to the container
    const chars: Text[] = [];
    const lineContainers: Container[] = [];
    const wordContainers: Container[] = [];
    let yOffset = 0;
    let existingCharIndex = 0;

    // Cache gradient bounds object; identical for every character
    const gradientBounds = hasLocalGradient ? { width: fullTextWidth, height: fullTextHeight } : null;

    groupedSegments.forEach((group, lineIndex) =>
    {
        throw new Error("STUB");
    });

    return { chars, lines: lineContainers, words: wordContainers };
}

function canvasTaggedTextSplitFromRuns(
    measuredText: CanvasTextMetrics,
    textStyle: TextStyle,
    existingChars: Text[],
    text: string,
): TextSplitOutput<Text>
{
    const { runsByLine } = measuredText;
    const alignment = textStyle.align;
    const maxLineWidth = measuredText.lineWidths.reduce((max, line) => { throw new Error("STUB"); }, 0);

    let trimOffsetX = 0;
    let trimOffsetY = 0;

    if (textStyle.trim)
    {
        const { frame, canvasAndContext } = CanvasTextGenerator.getCanvasAndContext({
            text,
            style: textStyle,
            resolution: 1,
        });

        CanvasTextGenerator.returnCanvasAndContext(canvasAndContext);
        trimOffsetX = -frame.x;
        trimOffsetY = -frame.y;
    }

    const chars: Text[] = [];
    const lineContainers: Container[] = [];
    const wordContainers: Container[] = [];
    let yOffset = 0;
    let existingCharIndex = 0;

    runsByLine.forEach((lineRuns: TextStyleRun[], lineIndex: number) =>
    {
        throw new Error("STUB");
    });

    return { chars, lines: lineContainers, words: wordContainers };
}
