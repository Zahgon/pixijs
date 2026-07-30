import { type TypedArray } from '../../rendering/renderers/shared/buffer/Buffer';

/**
 * Flexible wrapper around `ArrayBuffer` that also provides typed array views on demand.
 * @category utils
 * @advanced
 */
export class ViewableBuffer
{
    /** The size of the buffer in bytes. */
    public size: number;

    /** Underlying `ArrayBuffer` that holds all the data and is of capacity `this.size`. */
    public rawBinaryData: ArrayBufferLike;

    /** View on the raw binary data as a `Uint32Array`. */
    public uint32View: Uint32Array;

    /** View on the raw binary data as a `Float32Array`. */
    public float32View: Float32Array;
    /** View on the raw binary data as a `Uint16Array`. */
    public uint16View: Uint16Array;

    private _int8View: Int8Array;
    private _uint8View: Uint8Array;
    private _int16View: Int16Array;
    private _int32View: Int32Array;
    private _float64Array: Float64Array;
    private _bigUint64Array: BigUint64Array;

    /**
     * @param length - The size of the buffer in bytes.
     */
    constructor(length: number);

    /**
     * @param arrayBuffer - The source array buffer.
     */
    constructor(arrayBuffer: ArrayBufferLike);

    constructor(sizeOrBuffer: number | ArrayBufferLike | Uint8Array)
    {
        throw new Error("STUB");
    }

    /** View on the raw binary data as a `Int8Array`. */
    get int8View(): Int8Array
    {
        throw new Error("STUB");
    }

    /** View on the raw binary data as a `Uint8Array`. */
    get uint8View(): Uint8Array
    {
        throw new Error("STUB");
    }

    /**  View on the raw binary data as a `Int16Array`. */
    get int16View(): Int16Array
    {
        throw new Error("STUB");
    }

    /** View on the raw binary data as a `Int32Array`. */
    get int32View(): Int32Array
    {
        throw new Error("STUB");
    }

    /** View on the raw binary data as a `Float64Array`. */
    get float64View(): Float64Array
    {
        throw new Error("STUB");
    }

    /** View on the raw binary data as a `BigUint64Array`. */
    get bigUint64View(): BigUint64Array
    {
        throw new Error("STUB");
    }

    /**
     * Returns the view of the given type.
     * @param type - One of `int8`, `uint8`, `int16`,
     *    `uint16`, `int32`, `uint32`, and `float32`.
     * @returns - typed array of given type
     */
    public view(type: string): TypedArray
    {
        throw new Error("STUB");
    }

    /** Destroys all buffer references. Do not use after calling this. */
    public destroy(): void
    {
        this.rawBinaryData = null;
        this.uint32View = null;
        this.float32View = null;
        this.uint16View = null;
        this._int8View = null;
        this._uint8View = null;
        this._int16View = null;
        this._int32View = null;
        this._float64Array = null;
        this._bigUint64Array = null;
    }

    /**
     * Returns the size of the given type in bytes.
     * @param type - One of `int8`, `uint8`, `int16`,
     *   `uint16`, `int32`, `uint32`, and `float32`.
     * @returns - size of the type in bytes
     */
    public static sizeOf(type: string): number
    {
        throw new Error("STUB");
    }
}
