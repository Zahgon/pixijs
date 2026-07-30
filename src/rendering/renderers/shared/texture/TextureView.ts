import EventEmitter from 'eventemitter3';
import { uid } from '../../../../utils/data/uid';

import type { BindResource } from '../../gpu/shader/BindResource';
import type { TextureSource } from './sources/TextureSource';

/**
 * A TextureView allows you to specify exactly how a `TextureSource` should be interpreted by the GPU.
 * This is particularly useful for advanced 3D rendering where you might need to view a depth/stencil
 * texture as purely a 'depth-only' or 'stencil-only' view.
 *
 * It implements `BindResource` so it can be passed directly into a `BindGroup` or `Shader`.
 * @category rendering
 * @advanced
 */
export class TextureView extends EventEmitter<{
    change: TextureView;
    destroy: TextureView;
}> implements BindResource
{
    /** The type of resource this is (for BindGroup compatibility). */
    public readonly _resourceType = 'textureView';
    /** Unique ID for this resource. */
    public readonly _resourceId: number = uid('resource');
    /** Used for GC. */
    public _touched = 0;

    /** The underlying texture source. */
    public readonly source: TextureSource;
    /** The WebGPU texture view descriptor. */
    public readonly viewDescriptor: GPUTextureViewDescriptor;

    /**
     * @param source - The texture source to view.
     * @param viewDescriptor - The WebGPU texture view descriptor.
     */
    constructor(source: TextureSource, viewDescriptor: GPUTextureViewDescriptor)
    {
        throw new Error("STUB");
    }

    private _onChange(): void
    {
        throw new Error("STUB");
    }

    private _onDestroy(): void
    {
        throw new Error("STUB");
    }

    /** Returns whether the underlying source is destroyed. */
    get destroyed(): boolean
    {
        throw new Error("STUB");
    }

    /** Destroys the view and cleans up event listeners. */
    public destroy(): void
    {
        if (this.source)
        {
            this.source.off('change', this._onChange);
            this.source.off('destroy', this._onDestroy);
        }

        this.emit('destroy', this);
        this.removeAllListeners();
    }
}
