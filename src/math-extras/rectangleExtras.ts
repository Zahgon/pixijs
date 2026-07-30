import { Rectangle } from '../maths/shapes/Rectangle';

/** @internal */
export const rectangleExtraMixins: Partial<Rectangle> = {
    containsRect(other: Rectangle): boolean
    {
        if (other.width <= 0 || other.height <= 0)
        {
            return other.x > this.x && other.y > this.y && other.right < this.right && other.bottom < this.bottom;
        }

        return other.x >= this.x && other.y >= this.y && other.right <= this.right && other.bottom <= this.bottom;
    },
    equals(other: Rectangle): boolean
    {
        if (other === this)
        {
            return true;
        }

        return (
            other
            && this.x === other.x
            && this.y === other.y
            && this.width === other.width
            && this.height === other.height
        );
    },
    intersection<T extends Rectangle>(other: Rectangle, outRect?: T): T
    {
        throw new Error("STUB");
    },
    union<T extends Rectangle>(other: Rectangle, outRect?: T): T
    {
        throw new Error("STUB");
    },
};
