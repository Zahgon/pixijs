import { uid } from '../../../../../utils/data/uid';
import { GlTexture } from '../../../gl/texture/GlTexture';
import { GPUTextureGpuData } from '../../../gpu/texture/GpuTextureSystem';
import { type Renderer, RendererType } from '../../../types';
import { TextureSource } from './TextureSource';

// Shared placeholders - created lazily, reused by all ExternalSource instances
const placeholderGl: Record<number, WebGLTexture> = Object.create(null);
const placeholderGpu: Record<number, GPUTexture> = Object.create(null);

function getPlaceholder(renderer: Renderer): GPUTexture | WebGLTexture
{
    throw new Error("STUB");
}

/**
 * Options for creating an ExternalSource.
 * @category rendering
 * @advanced
 */
export interface ExternalSourceOptions
{
    /**
     * The external GPU texture (GPUTexture for WebGPU, WebGLTexture for WebGL).
     * If not provided, a shared 1x1 placeholder texture will be used until
     * `updateGPUTexture()` is called.
     * @advanced
     */
    resource?: GPUTexture | WebGLTexture;
    /**
     * The renderer this texture will be used with
     * @advanced
     */
    renderer: Renderer;
    /**
     * Width of the texture. Auto-detected for GPUTexture, required for WebGLTexture.
     * @advanced
     */
    width?: number;
    /**
     * Height of the texture. Auto-detected for GPUTexture, required for WebGLTexture.
     * @advanced
     */
    height?: number;
    /**
     * Optional label for debugging
     * @advanced
     */
    label?: string;
}

/**
 * A texture source that uses a GPU texture from an external library (e.g., Three.js).
 *
 * This allows sharing textures between PixiJS and other WebGL/WebGPU libraries without
 * re-uploading pixel data. The renderer is required so that ExternalSource can
 * pre-populate the GPU data and validate context ownership.
 * @example
 * ```typescript
 * // WebGPU - dimensions auto-detected
 * const texture = new Texture({
 *     source: new ExternalSource({
 *         resource: threeJsGpuTexture,
 *         renderer: renderer,
 *     })
 * });
 *
 * // WebGL - must provide dimensions (WebGLTexture is opaque)
 * const texture = new Texture({
 *     source: new ExternalSource({
 *         resource: threeJsGlTexture,
 *         renderer: renderer,
 *         width: 512,
 *         height: 512,
 *     })
 * });
 *
 * // Update to a new external texture
 * (texture.source as ExternalSource).updateGPUTexture(newExternalTexture);
 * ```
 * @category rendering
 * @advanced
 */
export class ExternalSource extends TextureSource<GPUTexture | WebGLTexture>
{
    private readonly _renderer: Renderer;

    constructor({ resource, renderer, label, width, height }: ExternalSourceOptions)
    {
        throw new Error("STUB");
    }

    /**
     * Test if a resource is a valid external GPU texture.
     * @param resource - The resource to test
     * @returns True if the resource is a GPUTexture or WebGLTexture
     */
    public static test(resource: unknown): resource is GPUTexture | WebGLTexture
    {
        return (
            (globalThis.GPUTexture && resource instanceof GPUTexture)
            || (globalThis.WebGLTexture && resource instanceof WebGLTexture)
        );
    }

    private _validateTexture(resource: GPUTexture | WebGLTexture): void
    {
        throw new Error("STUB");
    }

    private _initGpuData(resource: GPUTexture | WebGLTexture): void
    {
        throw new Error("STUB");
    }

    /**
     * Update the external GPU texture reference.
     * Call this when the external library provides a new texture.
     * @param gpuTexture - The new GPU texture
     * @param width - New width (required for WebGLTexture, auto-detected for GPUTexture)
     * @param height - New height (required for WebGLTexture, auto-detected for GPUTexture)
     */
    public updateGPUTexture(gpuTexture: GPUTexture | WebGLTexture, width?: number, height?: number): void
    {
        throw new Error("STUB");
    }

    public override destroy(): void
    {
        // Never destroy the GPU texture:
        // - Placeholder is shared across all instances
        // - External textures are owned by the external library
        const renderer = this._renderer;

        delete this._gpuData[renderer.uid];

        super.destroy();
    }
}
