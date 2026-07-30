import { Point } from '../maths/point/Point';

import type { PointData } from '../maths/point/PointData';

/** @internal */
export const pointExtraMixins: any = {
    add<T extends PointData>(other: PointData, outPoint?: T): T
    {
        if (!outPoint)
        {
            outPoint = new Point() as PointData as T;
        }
        outPoint.x = this.x + other.x;
        outPoint.y = this.y + other.y;

        return outPoint;
    },
    subtract<T extends PointData>(other: PointData, outPoint?: T): T
    {
        throw new Error("STUB");
    },
    multiply<T extends PointData>(other: PointData, outPoint?: T): T
    {
        throw new Error("STUB");
    },
    multiplyScalar<T extends PointData>(scalar: number, outPoint?: T): T
    {
        throw new Error("STUB");
    },
    dot(other: PointData): number
    {
        throw new Error("STUB");
    },
    cross(other: PointData): number
    {
        throw new Error("STUB");
    },
    normalize<T extends PointData>(outPoint?: T): T
    {
        if (!outPoint)
        {
            outPoint = new Point() as PointData as T;
        }
        const magnitude = Math.sqrt((this.x * this.x) + (this.y * this.y));

        outPoint.x = this.x / magnitude;
        outPoint.y = this.y / magnitude;

        return outPoint;
    },
    magnitude(): number
    {
        throw new Error("STUB");
    },
    magnitudeSquared(): number
    {
        throw new Error("STUB");
    },
    project<T extends PointData>(onto: PointData, outPoint?: T): T
    {
        throw new Error("STUB");
    },
    reflect<T extends PointData>(normal: PointData, outPoint?: T): T
    {
        throw new Error("STUB");
    },
    rotate<T extends PointData>(radians: number, outPoint?: T): T
    {
        outPoint ??= new Point() as PointData as T;

        const cosTheta = Math.cos(radians);
        const sinTheta = Math.sin(radians);

        outPoint.x = (this.x * cosTheta) - (this.y * sinTheta);
        outPoint.y = (this.x * sinTheta) + (this.y * cosTheta);

        return outPoint;
    }
};
