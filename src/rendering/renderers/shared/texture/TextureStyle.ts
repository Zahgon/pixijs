import EventEmitter from 'eventemitter3';
import { uid } from '../../../../utils/data/uid';
import { deprecation, v8_0_0 } from '../../../../utils/logging/deprecation';

import type { BindResource } from '../../gpu/shader/BindResource';
import type { COMPARE_FUNCTION, SCALE_MODE, WRAP_MODE } from './const';

const idHash: Record<string, number> = Object.create(null);

/**
 * This takes a shader string and maps it to a resource id.
 * This is a little different than regular resource ids as these ids
 * are not unique to the resource. But must not overlap with other (non sampler) resources Ids.
 * @param value - the string to turn into a resource id
 * @returns a unique resource id
 */
function createResourceIdFromString(value: string): number
{
    throw new Error("STUB");
}

/**
 * The options for the texture style.
 * @category rendering
 * @advanced
 */
export interface TextureStyleOptions extends Partial<TextureStyle>
{
    /** setting this will set wrapModeU,wrapModeV and wrapModeW all at once! */
    addressMode?: WRAP_MODE;
    /** specifies the {{GPUAddressMode|address modes}} for the texture width, height, and depth coordinates, respectively. */
    addressModeU?: WRAP_MODE;
    /** specifies the {{GPUAddressMode|address modes}} for the texture width, height, and depth coordinates, respectively. */
    addressModeV?: WRAP_MODE;
    /** Specifies the {{GPUAddressMode|address modes}} for the texture width, height, and depth coordinates, respectively. */
    addressModeW?: WRAP_MODE;

    /** setting this will set magFilter,minFilter and mipmapFilter all at once!  */
    scaleMode?: SCALE_MODE;

    /** specifies the sampling behavior when the sample footprint is smaller than or equal to one texel. */
    magFilter?: SCALE_MODE;
    /** specifies the sampling behavior when the sample footprint is larger than one texel. */
    minFilter?: SCALE_MODE;
    /** specifies behavior for sampling between mipmap levels. */
    mipmapFilter?: SCALE_MODE;

    /** specifies the minimum and maximum levels of detail, respectively, used internally when sampling a texture. */
    lodMinClamp?: number;
    /** Specifies the minimum and maximum levels of detail, respectively, used internally when sampling a texture. */
    lodMaxClamp?: number;
    /**
     * When provided the sampler will be a comparison sampler with the specified
     * {@link COMPARE_FUNCTION}.
     * Note: Comparison samplers may use filtering, but the sampling results will be
     * implementation-dependent and may differ from the normal filtering rules.
     */
    compare?: COMPARE_FUNCTION;
    /**
     * Specifies the maximum anisotropy value clamp used by the sampler.
     * Note: Most implementations support {@link TextureStyle#maxAnisotropy} values in range
     * between 1 and 16, inclusive. The used value of {@link TextureStyle#maxAnisotropy} will
     * be clamped to the maximum value that the platform supports.
     *
     * setting this to anything higher than 1 will set scale modes to 'linear'
     */
    maxAnisotropy?: number;
}

/**
 * A texture style describes how a texture should be sampled by a shader.
 * @category rendering
 * @advanced
 */
export class TextureStyle extends EventEmitter<{
    change: TextureStyle,
    destroy: TextureStyle,
}> implements BindResource
{
    /** @internal */
    public _resourceType = 'textureSampler';
    /** @internal */
    public _touched = 0;
    private _sharedResourceId: number;

    /** default options for the style */
    public static readonly defaultOptions: TextureStyleOptions = {
        addressMode: 'clamp-to-edge',
        scaleMode: 'linear'
    };

    /** */
    public addressModeU?: WRAP_MODE;
    /** */
    public addressModeV?: WRAP_MODE;
    /** Specifies the {{GPUAddressMode|address modes}} for the texture width, height, and depth coordinates, respectively. */
    public addressModeW?: WRAP_MODE;
    /** Specifies the sampling behavior when the sample footprint is smaller than or equal to one texel. */
    public magFilter?: SCALE_MODE;
    /** Specifies the sampling behavior when the sample footprint is larger than one texel. */
    public minFilter?: SCALE_MODE;
    /** Specifies behavior for sampling between mipmap levels. */
    public mipmapFilter?: SCALE_MODE;
    /** */
    public lodMinClamp?: number;
    /** Specifies the minimum and maximum levels of detail, respectively, used internally when sampling a texture. */
    public lodMaxClamp?: number;
    /**
     * When provided the sampler will be a comparison sampler with the specified
     * {@link COMPARE_FUNCTION}.
     * Note: Comparison samplers may use filtering, but the sampling results will be
     * implementation-dependent and may differ from the normal filtering rules.
     */
    public compare?: COMPARE_FUNCTION;
    /**
     * Specifies the maximum anisotropy value clamp used by the sampler.
     * Note: Most implementations support {@link TextureStyle#maxAnisotropy} values in range
     * between 1 and 16, inclusive. The used value of {@link TextureStyle#maxAnisotropy} will
     * be clamped to the maximum value that the platform supports.
     * @internal
     */
    public _maxAnisotropy?: number = 1;

    /**
     * Has the style been destroyed?
     * @readonly
     */
    public destroyed = false;

    /**
     * @param options - options for the style
     */
    constructor(options: TextureStyleOptions = {})
    {
        throw new Error("STUB");
    }

    set addressMode(value: WRAP_MODE)
    {
        throw new Error("STUB");
    }

    /** setting this will set wrapModeU,wrapModeV and wrapModeW all at once! */
    get addressMode(): WRAP_MODE
    {
        throw new Error("STUB");
    }

    set wrapMode(value: WRAP_MODE)
    {
        throw new Error("STUB");
    }

    get wrapMode(): WRAP_MODE
    {
        throw new Error("STUB");
    }

    set scaleMode(value: SCALE_MODE)
    {
        throw new Error("STUB");
    }

    /** setting this will set magFilter,minFilter and mipmapFilter all at once!  */
    get scaleMode(): SCALE_MODE
    {
        throw new Error("STUB");
    }

    /** Specifies the maximum anisotropy value clamp used by the sampler. */
    set maxAnisotropy(value: number)
    {
        throw new Error("STUB");
    }

    get maxAnisotropy(): number
    {
        throw new Error("STUB");
    }

    // TODO - move this to WebGL?
    get _resourceId(): number
    {
        throw new Error("STUB");
    }

    public update()
    {
        // manage the resource..
        this._sharedResourceId = null;
        this.emit('change', this);
    }

    private _generateResourceId(): number
    {
        throw new Error("STUB");
    }

    /** Destroys the style */
    public destroy()
    {
        this.destroyed = true;

        this.emit('destroy', this);
        this.emit('change', this);

        this.removeAllListeners();
    }
}
