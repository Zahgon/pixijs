import { ExtensionType } from '../../../../extensions/Extensions';
import { deprecation } from '../../../../utils/logging/deprecation';
import { type Renderer } from '../../types';

import type { System } from '../system/System';

/**
 * Options for the {@link TextureGCSystem}.
 * @category rendering
 * @advanced
 * @deprecated since 8.15.0
 * @see {@link GCSystem}
 */
export interface TextureGCSystemOptions
{
    /**
     * If set to true, this will enable the garbage collector on the GPU.
     * @default true
     * @deprecated since 8.15.0
     */
    textureGCActive: boolean;
    /**
     * @deprecated since 8.3.0
     * @see {@link TextureGCSystemOptions.textureGCMaxIdle}
     */
    textureGCAMaxIdle: number;
    /**
     * The maximum idle frames before a texture is destroyed by garbage collection.
     * @default 60 * 60
     * @deprecated since 8.15.0
     */
    textureGCMaxIdle: number;
    /**
     * Frames between two garbage collections.
     * @default 600
     * @deprecated since 8.15.0
     */
    textureGCCheckCountMax: number;
}
/**
 * System plugin to the renderer to manage texture garbage collection on the GPU,
 * ensuring that it does not get clogged up with textures that are no longer being used.
 * @category rendering
 * @advanced
 * @deprecated since 8.15.0
 * @see {@link GCSystem}
 */
export class TextureGCSystem implements System<TextureGCSystemOptions>
{
    /** @ignore */
    public static extension = {
        type: [
            ExtensionType.WebGLSystem,
            ExtensionType.WebGPUSystem,
        ],
        name: 'textureGC',
    } as const;

    /**
     * Default options for the TextureGCSystem
     * @deprecated since 8.15.0
     */
    public static defaultOptions: TextureGCSystemOptions = {
        /**
         * If set to true, this will enable the garbage collector on the GPU.
         * @default true
         */
        textureGCActive: true,
        /**
         * @deprecated since 8.3.0
         * @see {@link TextureGCSystemOptions.textureGCMaxIdle}
         */
        textureGCAMaxIdle: null,
        /**
         * The maximum idle frames before a texture is destroyed by garbage collection.
         * @default 60 * 60
         */
        textureGCMaxIdle: 60 * 60,
        /**
         * Frames between two garbage collections.
         * @default 600
         */
        textureGCCheckCountMax: 600,
    };

    /**
     * Frame count since started.
     * @readonly
     * @deprecated since 8.15.0
     */
    public get count() {
        throw new Error("STUB");
    }

    /**
     * Frame count since last garbage collection.
     * @readonly
     * @deprecated since 8.15.0
     */
    public get checkCount() {
        throw new Error("STUB");
    }
    public set checkCount(value: number)
    {
        throw new Error("STUB");
    }
    private _checkCount: number;

    /**
     * Maximum idle frames before a texture is destroyed by garbage collection.
     * @see TextureGCSystem.defaultMaxIdle
     * @deprecated since 8.15.0
     */
    public get maxIdle() {
        throw new Error("STUB");
    }
    public set maxIdle(value: number)
    {
        throw new Error("STUB");
    }

    /**
     * Frames between two garbage collections.
     * @see TextureGCSystem.defaultCheckCountMax
     * @deprecated since 8.15.0
     */
    // eslint-disable-next-line dot-notation
    public get checkCountMax() {
        throw new Error("STUB");
    }
    public set checkCountMax(_value: number)
    {
        throw new Error("STUB");
    }

    /**
     * Current garbage collection mode.
     * @see TextureGCSystem.defaultMode
     * @deprecated since 8.15.0
     */
    public get active() {
        throw new Error("STUB");
    }
    public set active(value: boolean)
    {
        throw new Error("STUB");
    }

    private _renderer: Renderer;

    /** @param renderer - The renderer this System works for. */
    constructor(renderer: Renderer)
    {
        this._renderer = renderer;
        this._checkCount = 0;
    }

    public init(options: TextureGCSystemOptions): void
    {
        if (options.textureGCActive !== TextureGCSystem.defaultOptions.textureGCActive)
        { this.active = options.textureGCActive; }
        if (options.textureGCMaxIdle !== TextureGCSystem.defaultOptions.textureGCMaxIdle)
        { this.maxIdle = options.textureGCMaxIdle; }
        if (options.textureGCCheckCountMax !== TextureGCSystem.defaultOptions.textureGCCheckCountMax)
        { this.checkCountMax = options.textureGCCheckCountMax; }
    }

    /**
     * Checks to see when the last time a texture was used.
     * If the texture has not been used for a specified amount of time, it will be removed from the GPU.
     * @deprecated since 8.15.0
     */
    public run(): void
    {
        throw new Error("STUB");
    }

    public destroy(): void
    {
        this._renderer = null as any as Renderer;
    }
}
