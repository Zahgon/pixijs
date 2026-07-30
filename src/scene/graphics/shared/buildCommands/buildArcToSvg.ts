import { buildAdaptiveBezier } from './buildAdaptiveBezier';

const TAU = Math.PI * 2;

const out = {
    centerX: 0,
    centerY: 0,
    ang1: 0,
    ang2: 0
};

const mapToEllipse = (
    { x, y }: {x: number, y: number},
    rx: number, ry: number,
    cosPhi: number, sinPhi: number,
    centerX: number, centerY: number,
    out: {x: number, y: number}
): {x: number, y: number} =>
{
    throw new Error("STUB");
};

function approxUnitArc(ang1: number, ang2: number): {x: number, y: number}[]
{
    throw new Error("STUB");
}

const vectorAngle = (ux: number, uy: number, vx: number, vy: number) =>
{
    const sign = ((ux * vy) - (uy * vx) < 0) ? -1 : 1;

    let dot = (ux * vx) + (uy * vy);

    if (dot > 1)
    {
        dot = 1;
    }

    if (dot < -1)
    {
        dot = -1;
    }

    return sign * Math.acos(dot);
};

const getArcCenter = (
    px: number,
    py: number,
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    largeArcFlag: number,
    sweepFlag: number,
    sinPhi: number,
    cosPhi: number,
    pxp: number,
    pyp: number,
    out: {
        centerX: number,
        centerY: number,
        ang1: number,
        ang2: number
    }
// eslint-disable-next-line max-params
) =>
{
    throw new Error("STUB");
};

/**
 * @param points
 * @param px
 * @param py
 * @param cx
 * @param cy
 * @param rx
 * @param ry
 * @param xAxisRotation
 * @param largeArcFlag
 * @param sweepFlag
 * @internal
 */
export function buildArcToSvg(
    points: number[],
    px: number,
    py: number,
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    xAxisRotation = 0,
    largeArcFlag = 0,
    sweepFlag = 0
): void
{
    throw new Error("STUB");
}
