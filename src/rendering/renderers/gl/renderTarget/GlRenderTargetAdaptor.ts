import { Rectangle } from '../../../../maths/shapes/Rectangle';
import { warn } from '../../../../utils/logging/warn';
import { CanvasSource } from '../../shared/texture/sources/CanvasSource';
import { CLEAR } from '../const';
import { GlRenderTarget } from '../GlRenderTarget';

import type { RgbaArray } from '../../../../color/Color';
import type { RenderTarget } from '../../shared/renderTarget/RenderTarget';
import type { RenderTargetAdaptor, RenderTargetSystem } from '../../shared/renderTarget/RenderTargetSystem';
import type { Texture } from '../../shared/texture/Texture';
import type { CLEAR_OR_BOOL } from '../const';
import type { GlRenderingContext } from '../context/GlRenderingContext';
import type { WebGLRenderer } from '../WebGLRenderer';

/**
 * The WebGL adaptor for the render target system. Allows the Render Target System to be used with the WebGL renderer
 * @category rendering
 * @ignore
 */
export class GlRenderTargetAdaptor implements RenderTargetAdaptor<GlRenderTarget>
{
    private _renderTargetSystem: RenderTargetSystem<GlRenderTarget>;
    private _renderer: WebGLRenderer<HTMLCanvasElement>;
    private _clearColorCache: RgbaArray = [0, 0, 0, 0];
    private _viewPortCache: Rectangle = new Rectangle();
    /** Pre-computed draw buffers arrays for MRT, indexed by color attachment count */
    private _drawBuffersCache: number[][];
    /**
     * The framebuffer currently bound to `gl.FRAMEBUFFER`, used to skip a redundant `bindFramebuffer`
     * when re-binding the same target. `undefined` means "unknown" (force a real bind). All framebuffer
     * binding must go through {@link bindFramebuffer} to keep this coherent; {@link resetState} marks
     * it unknown when external GL code may have changed the binding.
     */
    private _boundFramebuffer: WebGLFramebuffer | null | undefined = undefined;

    public init(renderer: WebGLRenderer, renderTargetSystem: RenderTargetSystem<GlRenderTarget>): void
    {
        this._renderer = renderer;
        this._renderTargetSystem = renderTargetSystem;

        renderer.runners.contextChange.add(this);
    }

    public contextChange(): void
    {
        throw new Error("STUB");
    }

    public copyToTexture(
        sourceRenderSurfaceTexture: RenderTarget,
        destinationTexture: Texture,
        originSrc: { x: number; y: number; },
        size: { width: number; height: number; },
        originDest: { x: number; y: number; },
    )
    {
        const renderTargetSystem = this._renderTargetSystem;

        const renderer = this._renderer;
        const glRenderTarget = renderTargetSystem.getGpuRenderTarget(sourceRenderSurfaceTexture);
        const gl = renderer.gl;

        this.finishRenderPass(sourceRenderSurfaceTexture);

        gl.bindFramebuffer(gl.FRAMEBUFFER, glRenderTarget.resolveTargetFramebuffer);
        this._boundFramebuffer = glRenderTarget.resolveTargetFramebuffer;

        renderer.texture.bind(destinationTexture, 0);

        gl.copyTexSubImage2D(gl.TEXTURE_2D, 0,
            originDest.x, originDest.y,
            originSrc.x,
            originSrc.y,
            size.width,
            size.height
        );

        return destinationTexture;
    }

    public copyDepthTexture(
        source: RenderTarget,
        destination: Texture,
        originSrc: { x: number; y: number; },
        size: { width: number; height: number; },
        originDest: { x: number; y: number; },
    ): void
    {
        throw new Error("STUB");
    }

    public startRenderPass(
        renderTarget: RenderTarget,
        clear: CLEAR_OR_BOOL = true,
        clearColor?: RgbaArray,
        viewport?: Rectangle,
        mipLevel = 0,
        layer = 0
    )
    {
        const renderTargetSystem = this._renderTargetSystem;

        const gpuRenderTarget = renderTargetSystem.getGpuRenderTarget(renderTarget);

        // validation..
        if (layer !== 0 && this._renderer.context.webGLVersion < 2)
        {
            throw new Error('[RenderTargetSystem] Rendering to array layers requires WebGL2.');
        }

        if (mipLevel > 0)
        {
            if (gpuRenderTarget.msaa)
            {
                throw new Error('[RenderTargetSystem] Rendering to mip levels is not supported with MSAA render targets.');
            }

            if (this._renderer.context.webGLVersion < 2)
            {
                throw new Error('[RenderTargetSystem] Rendering to mip levels requires WebGL2.');
            }
        }

        // do the work..

        renderTarget.colorAttachments.forEach((attachment) =>
        {
            throw new Error("STUB");
        });

        const gl = this._renderer.gl;

        // Skip a redundant glBindFramebuffer when this FBO is already bound (idempotent bind).
        // The attachment (mip/layer) and viewport caches below still re-run their own "math".
        this.bindFramebuffer(gpuRenderTarget.framebuffer);

        if (
            !renderTarget.isRoot
            && renderTarget.colorAttachments.length > 0
            && (gpuRenderTarget._attachedMipLevel !== mipLevel
                || gpuRenderTarget._attachedLayer !== layer)
        )
        {
            renderTarget.colorAttachments.forEach((attachment, i) =>
            {
                throw new Error("STUB");
            });

            gpuRenderTarget._attachedMipLevel = mipLevel;
            gpuRenderTarget._attachedLayer = layer;
        }

        // the root target renders to the canvas, whose context owns its depth/stencil buffers
        if (gpuRenderTarget.framebuffer)
        {
            if (renderTarget.depthStencilAttachment)
            {
                this._attachDepthStencilTexture(renderTarget, mipLevel, layer);
            }
            // depth/stencil requested without an explicit texture — a renderbuffer is cheaper
            // and (unlike a texture) can be multisampled to match an MSAA color attachment
            else if (!gpuRenderTarget.depthStencilRenderBuffer && (renderTarget.stencil || renderTarget.depth))
            {
                this._initStencil(gpuRenderTarget);
            }
        }

        // Set draw buffers for multiple render targets (MRT)
        if (renderTarget.colorAttachments.length > 1)
        {
            this._setDrawBuffers(renderTarget, gl);
        }

        let viewPortY = viewport.y;

        if (renderTarget.isRoot)
        {
            viewPortY = renderTarget.pixelHeight - viewport.height - viewport.y;
        }

        const viewPortCache = this._viewPortCache;

        if (viewPortCache.x !== viewport.x
            || viewPortCache.y !== viewPortY
            || viewPortCache.width !== viewport.width
            || viewPortCache.height !== viewport.height)
        {
            viewPortCache.x = viewport.x;
            viewPortCache.y = viewPortY;
            viewPortCache.width = viewport.width;
            viewPortCache.height = viewport.height;

            gl.viewport(
                viewport.x,
                viewPortY,
                viewport.width,
                viewport.height,
            );
        }

        this.clear(renderTarget, clear, clearColor);
    }

    public finishRenderPass(renderTarget?: RenderTarget)
    {
        const renderTargetSystem = this._renderTargetSystem;

        const glRenderTarget = renderTargetSystem.getGpuRenderTarget(renderTarget);

        // Depth-only targets have no color buffer to resolve
        if (!glRenderTarget.msaa || renderTarget.colorAttachments.length === 0) return;

        const gl = this._renderer.gl;

        gl.bindFramebuffer(gl.FRAMEBUFFER, glRenderTarget.resolveTargetFramebuffer);
        gl.bindFramebuffer(gl.READ_FRAMEBUFFER, glRenderTarget.framebuffer);

        gl.blitFramebuffer(
            0, 0, glRenderTarget.width, glRenderTarget.height,
            0, 0, glRenderTarget.width, glRenderTarget.height,
            gl.COLOR_BUFFER_BIT, gl.NEAREST,
        );

        gl.bindFramebuffer(gl.FRAMEBUFFER, glRenderTarget.framebuffer);
        // we explicitly drove FRAMEBUFFER (both read+draw) back to the multisample framebuffer
        this._boundFramebuffer = glRenderTarget.framebuffer;
    }

    public initGpuRenderTarget(renderTarget: RenderTarget): GlRenderTarget
    {
        const renderer = this._renderer;

        const gl = renderer.gl;

        const glRenderTarget = new GlRenderTarget();

        glRenderTarget._attachedMipLevel = 0;
        glRenderTarget._attachedLayer = 0;

        const colorTexture = renderTarget.colorTexture;

        if (colorTexture instanceof CanvasSource)
        {
            this._renderer.context.ensureCanvasSize(colorTexture.resource);

            glRenderTarget.framebuffer = null;

            return glRenderTarget;
        }

        glRenderTarget.width = renderTarget.pixelWidth;
        glRenderTarget.height = renderTarget.pixelHeight;

        if (renderTarget.colorAttachments.length === 0)
        {
            this._initDepth(renderTarget, glRenderTarget);
        }
        else
        {
            this._initColor(renderTarget, glRenderTarget);
        }

        if (renderTarget.depthStencilAttachment)
        {
            this._attachDepthStencilTexture(renderTarget, 0, 0);
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        // init drove the binding through several raw framebuffers and ended on the default one
        this._boundFramebuffer = null;

        return glRenderTarget;
    }

    public destroyGpuRenderTarget(gpuRenderTarget: GlRenderTarget)
    {
        const gl = this._renderer.gl;

        if (gpuRenderTarget.framebuffer)
        {
            gl.deleteFramebuffer(gpuRenderTarget.framebuffer);
            gpuRenderTarget.framebuffer = null;
        }

        if (gpuRenderTarget.resolveTargetFramebuffer)
        {
            gl.deleteFramebuffer(gpuRenderTarget.resolveTargetFramebuffer);
            gpuRenderTarget.resolveTargetFramebuffer = null;
        }

        if (gpuRenderTarget.depthStencilRenderBuffer)
        {
            gl.deleteRenderbuffer(gpuRenderTarget.depthStencilRenderBuffer);
            gpuRenderTarget.depthStencilRenderBuffer = null;
        }

        gpuRenderTarget.msaaRenderBuffer.forEach((renderBuffer) =>
        {
            throw new Error("STUB");
        });

        gpuRenderTarget.msaaRenderBuffer = null;
    }

    public clear(
        renderTarget: RenderTarget,
        clear: CLEAR_OR_BOOL,
        clearColor?: RgbaArray,
        _viewport?: Rectangle,
        _mipLevel = 0,
        layer = 0
    )
    {
        if (!clear) return;

        if (layer !== 0)
        {
            throw new Error('[RenderTargetSystem] Clearing array layers is not supported in WebGL renderer.');
        }

        const renderTargetSystem = this._renderTargetSystem;

        // if clear is boolean..
        if (typeof clear === 'boolean')
        {
            clear = clear ? CLEAR.ALL : CLEAR.NONE;
        }

        // Strip the COLOR bit for depth-only targets – there is no color buffer to clear.
        if (renderTarget.colorAttachments.length === 0)
        {
            clear &= ~CLEAR.COLOR;

            if (!clear) return;
        }

        const gl = this._renderer.gl;

        // gl.clear's depth write is masked by gl.depthMask, which 2D rendering
        // (State.for2d) leaves disabled — force it on for the clear, then restore
        const forceDepthMask = !!(clear & CLEAR.DEPTH) && !this._renderer.state.depthMaskEnabled;

        if (clear & CLEAR.COLOR)
        {
            clearColor ??= renderTargetSystem.defaultClearColor;

            const clearColorCache = this._clearColorCache;
            const clearColorArray = clearColor as number[];

            if (clearColorCache[0] !== clearColorArray[0]
                || clearColorCache[1] !== clearColorArray[1]
                || clearColorCache[2] !== clearColorArray[2]
                || clearColorCache[3] !== clearColorArray[3])
            {
                clearColorCache[0] = clearColorArray[0];
                clearColorCache[1] = clearColorArray[1];
                clearColorCache[2] = clearColorArray[2];
                clearColorCache[3] = clearColorArray[3];

                gl.clearColor(clearColorArray[0], clearColorArray[1], clearColorArray[2], clearColorArray[3]);
            }
        }

        if (forceDepthMask) gl.depthMask(true);

        gl.clear(clear);

        if (forceDepthMask) gl.depthMask(false);
    }

    public resizeGpuRenderTarget(renderTarget: RenderTarget)
    {
        if (renderTarget.isRoot) return;

        const glRenderTarget = this._renderTargetSystem.getGpuRenderTarget(renderTarget);

        glRenderTarget.width = renderTarget.pixelWidth;
        glRenderTarget.height = renderTarget.pixelHeight;

        if (renderTarget.colorAttachments.length > 0)
        {
            this._resizeColor(renderTarget, glRenderTarget);
        }

        if (glRenderTarget.depthStencilRenderBuffer)
        {
            this._resizeStencil(glRenderTarget);
        }

        // _resizeColor (MSAA) rebinds framebuffers; force the next startRenderPass to bind explicitly
        this._boundFramebuffer = undefined;
    }

    private _initColor(renderTarget: RenderTarget, glRenderTarget: GlRenderTarget)
    {
        const renderer = this._renderer;

        const gl = renderer.gl;
        // deal with our outputs..
        const resolveTargetFramebuffer = gl.createFramebuffer();

        glRenderTarget.resolveTargetFramebuffer = resolveTargetFramebuffer;

        // set up the texture..
        gl.bindFramebuffer(gl.FRAMEBUFFER, resolveTargetFramebuffer);

        const colorAttachments = renderTarget.colorAttachments;

        colorAttachments.forEach((colorAttachment, i) =>
        {
            throw new Error("STUB");
        });

        if (glRenderTarget.msaa)
        {
            const viewFramebuffer = gl.createFramebuffer();

            glRenderTarget.framebuffer = viewFramebuffer;

            gl.bindFramebuffer(gl.FRAMEBUFFER, viewFramebuffer);

            renderTarget.colorAttachments.forEach((_, i) =>
            {
                throw new Error("STUB");
            });
        }
        else
        {
            glRenderTarget.framebuffer = resolveTargetFramebuffer;
        }

        this._resizeColor(renderTarget, glRenderTarget);
    }

    private _initDepth(_renderTarget: RenderTarget, glRenderTarget: GlRenderTarget)
    {
        const renderer = this._renderer;

        if (renderer.context.webGLVersion < 2)
        {
            throw new Error('[RenderTargetSystem] Depth-only render targets require WebGL2.');
        }

        const gl = renderer.gl;
        const framebuffer = gl.createFramebuffer();

        glRenderTarget.resolveTargetFramebuffer = framebuffer;
        glRenderTarget.framebuffer = framebuffer;

        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

        gl.drawBuffers([gl.NONE]);
        gl.readBuffer(gl.NONE);
    }

    private _resizeColor(renderTarget: RenderTarget, glRenderTarget: GlRenderTarget)
    {
        const source = renderTarget.colorAttachments[0].texture;

        // After a resize, attachments are implicitly at mip 0 again (and non-zero mip allocations may have changed).
        // Force a re-attach on next mip render.
        glRenderTarget._attachedMipLevel = 0;
        glRenderTarget._attachedLayer = 0;

        renderTarget.colorAttachments.forEach((colorAttachment, i) =>
        {
            throw new Error("STUB");
        });

        if (glRenderTarget.msaa)
        {
            const renderer = this._renderer;
            const gl = renderer.gl;

            const viewFramebuffer = glRenderTarget.framebuffer;

            gl.bindFramebuffer(gl.FRAMEBUFFER, viewFramebuffer);

            renderTarget.colorAttachments.forEach((colorAttachment, i) =>
            {
                throw new Error("STUB");
            });
        }
    }

    private _attachDepthStencilTexture(
        renderTarget: RenderTarget,
        mipLevel: number,
        layer: number
    )
    {
        const renderer = this._renderer;
        const gl = renderer.gl;
        const source = renderTarget.depthStencilAttachment.texture;

        const glSource = renderer.texture.getGlSource(source);
        const glTexture = glSource.texture;
        const format = source.format;

        // the attachment point must match the texture's aspects, or the framebuffer is incomplete
        let attachment: number;

        if (format === 'depth24plus-stencil8' || format === 'depth32float-stencil8')
        {
            attachment = gl.DEPTH_STENCIL_ATTACHMENT;
        }
        else if (format === 'stencil8')
        {
            attachment = gl.STENCIL_ATTACHMENT;
        }
        else
        {
            attachment = gl.DEPTH_ATTACHMENT;
        }

        if (glSource.target === gl.TEXTURE_2D)
        {
            gl.framebufferTexture2D(
                gl.FRAMEBUFFER,
                attachment,
                gl.TEXTURE_2D,
                glTexture,
                mipLevel
            );
        }
        else if (glSource.target === gl.TEXTURE_2D_ARRAY)
        {
            gl.framebufferTextureLayer(
                gl.FRAMEBUFFER,
                attachment,
                glTexture,
                mipLevel,
                layer
            );
        }
        else if (glSource.target === gl.TEXTURE_CUBE_MAP)
        {
            gl.framebufferTexture2D(
                gl.FRAMEBUFFER,
                attachment,
                gl.TEXTURE_CUBE_MAP_POSITIVE_X + layer,
                glTexture,
                mipLevel
            );
        }
    }

    private _initStencil(glRenderTarget: GlRenderTarget)
    {
        // this already exists on the default screen
        if (glRenderTarget.framebuffer === null) return;

        const gl = this._renderer.gl;

        const depthStencilRenderBuffer = gl.createRenderbuffer();

        glRenderTarget.depthStencilRenderBuffer = depthStencilRenderBuffer;

        gl.bindRenderbuffer(
            gl.RENDERBUFFER,
            depthStencilRenderBuffer
        );

        gl.framebufferRenderbuffer(
            gl.FRAMEBUFFER,
            gl.DEPTH_STENCIL_ATTACHMENT,
            gl.RENDERBUFFER,
            depthStencilRenderBuffer
        );

        // TODO
        this._resizeStencil(glRenderTarget);
    }

    private _resizeStencil(glRenderTarget: GlRenderTarget)
    {
        const gl = this._renderer.gl;

        gl.bindRenderbuffer(
            gl.RENDERBUFFER,
            glRenderTarget.depthStencilRenderBuffer
        );

        if (glRenderTarget.msaa)
        {
            gl.renderbufferStorageMultisample(
                gl.RENDERBUFFER,
                4,
                gl.DEPTH24_STENCIL8,
                glRenderTarget.width,
                glRenderTarget.height
            );
        }
        else
        {
            gl.renderbufferStorage(
                gl.RENDERBUFFER,
                this._renderer.context.webGLVersion === 2
                    ? gl.DEPTH24_STENCIL8
                    : gl.DEPTH_STENCIL,
                glRenderTarget.width,
                glRenderTarget.height
            );
        }
    }

    public prerender(renderTarget: RenderTarget)
    {
        throw new Error("STUB");
    }

    public postrender(renderTarget: RenderTarget)
    {
        throw new Error("STUB");
    }

    private _setDrawBuffers(renderTarget: RenderTarget, gl: GlRenderingContext): void
    {
        const count = renderTarget.colorAttachments.length;
        const bufferArray = this._drawBuffersCache[count];

        if (this._renderer.context.webGLVersion === 1)
        {
            const ext = this._renderer.context.extensions.drawBuffers;

            if (!ext)
            {
                warn('[RenderTexture] This WebGL1 context does not support rendering to multiple targets');
            }
            else
            {
                ext.drawBuffersWEBGL(bufferArray);
            }
        }
        else
        {
            // WebGL2 has built in support
            gl.drawBuffers(bufferArray);
        }
    }

    /**
     * Forget the GL-call caches (framebuffer binding, viewport, clear color) so the next pass
     * re-applies them. Called via the renderer's `resetState` runner when external GL code may
     * have changed state behind our back.
     */
    public resetState(): void
    {
        throw new Error("STUB");
    }

    /**
     * Binds a framebuffer to `gl.FRAMEBUFFER`, skipping the call when it is already bound.
     * The single blessed way to bind a framebuffer — keeps {@link _boundFramebuffer} coherent.
     * @param framebuffer - the framebuffer to bind
     * @internal
     */
    public bindFramebuffer(framebuffer: WebGLFramebuffer | null): void
    {
        if (this._boundFramebuffer === framebuffer) return;

        this._boundFramebuffer = framebuffer;
        this._renderer.gl.bindFramebuffer(this._renderer.gl.FRAMEBUFFER, framebuffer);
    }
}
