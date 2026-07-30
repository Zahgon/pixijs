import type { Matrix } from '../../../../maths/matrix/Matrix';
import type { Circle } from '../../../../maths/shapes/Circle';
import type { Ellipse } from '../../../../maths/shapes/Ellipse';
import type { Polygon } from '../../../../maths/shapes/Polygon';
import type { Rectangle } from '../../../../maths/shapes/Rectangle';
import type { RoundedRectangle } from '../../../../maths/shapes/RoundedRectangle';
import type { GraphicsPath, PathInstruction } from '../path/GraphicsPath';

const PI2 = Math.PI * 2;

const COMPLEX_ACTIONS = new Set<PathInstruction['action']>([
    'regularPoly',
    'roundPoly',
    'roundShape',
    'filletRect',
    'chamferRect',
    'arcTo',
]);

/**
 * Converts a `GraphicsPath` into an SVG path `d` attribute string.
 * Mirrors `parseSVGPath` but in the reverse direction.
 * @param path - The GraphicsPath to convert.
 * @param precision - Number of decimal places for coordinates.
 * @param flatten - When true, forces curve/arc geometry to be emitted as polylines.
 *                  Used when the parser's naive area estimator must parse every number
 *                  as a coordinate (e.g. hole subpaths).
 * @returns The SVG `d` attribute value.
 * @internal
 */
export function buildSVGPath(path: GraphicsPath, precision = 2, flatten = false): string
{
    throw new Error("STUB");
}

function isFullCircle(startAngle: number, endAngle: number, ccw: boolean): boolean
{
    throw new Error("STUB");
}

function n(value: number, precision: number): string
{
    return parseFloat(value.toFixed(precision)).toString();
}

function pt(x: number, y: number, matrix: Matrix | null | undefined, precision: number): string
{
    if (matrix && !matrix.isIdentity())
    {
        const tx = (matrix.a * x) + (matrix.c * y) + matrix.tx;
        const ty = (matrix.b * x) + (matrix.d * y) + matrix.ty;

        return `${n(tx, precision)} ${n(ty, precision)}`;
    }

    return `${n(x, precision)} ${n(y, precision)}`;
}

function buildArc(
    cx: number, cy: number, radius: number,
    startAngle: number, endAngle: number, ccw: boolean,
    hasCurrent: boolean,
    precision: number,
    flatten = false
): string
{
    let sweep = endAngle - startAngle;

    if (ccw)
    {
        if (sweep > 0) sweep -= PI2;
    }
    else if (sweep < 0)
    {
        sweep += PI2;
    }

    if (Math.abs(sweep) >= PI2 - 1e-6)
    {
        return buildEllipseArc(cx, cy, radius, radius, null, precision, flatten);
    }

    if (flatten)
    {
        const segments = 32;
        const parts: string[] = [];

        for (let i = 0; i <= segments; i++)
        {
            const a = startAngle + ((i / segments) * sweep);
            const px = cx + (radius * Math.cos(a));
            const py = cy + (radius * Math.sin(a));
            // eslint-disable-next-line no-nested-ternary
            const cmd = i === 0 ? (hasCurrent ? 'L' : 'M') : 'L';

            parts.push(`${cmd}${n(px, precision)} ${n(py, precision)}`);
        }

        return parts.join('');
    }

    const sx = cx + (radius * Math.cos(startAngle));
    const sy = cy + (radius * Math.sin(startAngle));
    const ex = cx + (radius * Math.cos(endAngle));
    const ey = cy + (radius * Math.sin(endAngle));

    const largeArc = Math.abs(sweep) > Math.PI ? 1 : 0;
    const sweepFlag = ccw ? 0 : 1;
    const start = hasCurrent ? 'L' : 'M';

    return `${start}${n(sx, precision)} ${n(sy, precision)}`
        + `A${n(radius, precision)} ${n(radius, precision)} 0 ${largeArc} ${sweepFlag} `
        + `${n(ex, precision)} ${n(ey, precision)}`;
}

function buildEllipseArc(
    cx: number, cy: number, rx: number, ry: number,
    matrixArg: Matrix | null | undefined,
    precision: number,
    flatten = false
): string
{
    const matrix = matrixArg && !matrixArg.isIdentity() ? matrixArg : null;

    // SVG arc params don't compose with an arbitrary matrix, so flatten under transform.
    if (!matrix && !flatten)
    {
        return `M${n(cx - rx, precision)} ${n(cy, precision)}`
            + `A${n(rx, precision)} ${n(ry, precision)} 0 1 1 ${n(cx + rx, precision)} ${n(cy, precision)}`
            + `A${n(rx, precision)} ${n(ry, precision)} 0 1 1 ${n(cx - rx, precision)} ${n(cy, precision)}Z`;
    }

    const segments = 64;
    const parts: string[] = [];

    for (let i = 0; i < segments; i++)
    {
        const a = (i / segments) * PI2;
        const x = cx + (rx * Math.cos(a));
        const y = cy + (ry * Math.sin(a));

        parts.push(`${i === 0 ? 'M' : 'L'}${pt(x, y, matrix, precision)}`);
    }

    parts.push('Z');

    return parts.join('');
}

function buildRect(
    x: number, y: number, w: number, h: number,
    matrix: Matrix | null | undefined,
    precision: number
): string
{
    throw new Error("STUB");
}

function buildRoundRect(
    x: number, y: number, w: number, h: number, r: number,
    matrixArg: Matrix | null | undefined,
    precision: number,
    flatten = false
): string
{
    throw new Error("STUB");
}

function buildPoly(
    points: number[] | { x: number, y: number }[],
    close: boolean,
    matrix: Matrix | null | undefined,
    precision: number
): string
{
    throw new Error("STUB");
}

function buildAddPath(inner: GraphicsPath, matrix: Matrix | undefined, precision: number, flatten: boolean): string
{
    throw new Error("STUB");
}

function buildFromShapePrimitives(path: GraphicsPath, precision: number, flatten: boolean): string
{
    throw new Error("STUB");
}
