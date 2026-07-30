import { ExtensionType } from '../../../../extensions/Extensions';
import { type RenderTarget } from '../../shared/renderTarget/RenderTarget';
import { State, STATE_BITS } from '../../shared/state/State';
import { type WebGLRenderer } from '../WebGLRenderer';
import { mapWebGLBlendModesToPixi } from './mapWebGLBlendModesToPixi';

import type { BLEND_MODES } from '../../shared/state/const';
import type { System } from '../../shared/system/System';
import type { GlRenderingContext } from '../context/GlRenderingContext';

const { BLEND, OFFSET, CULLING, DEPTH_TEST, WINDING, DEPTH_MASK } = STATE_BITS;

/**
 * System plugin to the renderer to manage WebGL state machines
 * @category rendering
 * @advanced
 */
export class GlStateSystem implements System
{
    /** @ignore */
    public static extension = {
        type: [
            ExtensionType.WebGLSystem,
        ],
        name: 'state',
    } as const;

    /**
     * State ID
     * @readonly
     */
    public stateId: number;

    /**
     * Polygon offset
     * @readonly
     */
    public polygonOffset: number;

    /**
     * Blend mode
     * @default 'none'
     * @readonly
     */
    public blendMode: BLEND_MODES;

    /** Whether current blend equation is different */
    protected _blendEq: boolean;

    /**
     * GL context
     * @type {WebGLRenderingContext}
     * @readonly
     */
    protected gl: GlRenderingContext;

    protected blendModesMap: Record<BLEND_MODES, number[]>;

    /**
     * Collection of calls
     * @type {Function[]}
     */
    protected readonly map: ((value: boolean) => void)[];

    /**
     * Collection of check calls
     * @type {Function[]}
     */
    protected readonly checks: ((system: this, state: State) => void)[];

    /**
     * Default WebGL State
     * @readonly
     */
    protected defaultState: State;

    /**
     * Whether to invert the front face when rendering
     * This is used for render textures where the Y-coordinate is flipped
     * @default false
     */
    private _invertFrontFace: boolean = false;
    private _glFrontFace: boolean;
    private _cullFace: boolean;
    private _frontFaceDirty: boolean;
    private _frontFace: boolean;

    constructor(renderer: WebGLRenderer)
    {
        throw new Error("STUB");
    }

    protected onRenderTargetChange(renderTarget: RenderTarget)
    {
        throw new Error("STUB");
    }

    protected contextChange(gl: GlRenderingContext): void
    {
        throw new Error("STUB");
    }

    /**
     * Sets the current state
     * @param {*} state - The state to set.
     */
    public set(state: State): void
    {
        state ||= this.defaultState;

        // TODO maybe to an object check? ( this.state === state )?
        if (this.stateId !== state.data)
        {
            let diff = this.stateId ^ state.data;
            let i = 0;

            // order from least to most common
            while (diff)
            {
                if (diff & 1)
                {
                    // state change!
                    this.map[i].call(this, !!(state.data & (1 << i)));
                }

                diff >>= 1;
                i++;
            }

            this.stateId = state.data;
        }

        // based on the above settings we check for specific modes..
        // for example if blend is active we check and set the blend modes
        // or of polygon offset is active we check the poly depth.
        for (let i = 0; i < this.checks.length; i++)
        {
            this.checks[i](this, state);
        }
    }

    /**
     * Sets the state, when previous state is unknown.
     * @param {*} state - The state to set
     */
    public forceState(state: State): void
    {
        throw new Error("STUB");
    }

    /**
     * Sets whether to enable or disable blending.
     * @param value - Turn on or off WebGl blending.
     */
    public setBlend(value: boolean): void
    {
        throw new Error("STUB");
    }

    /**
     * Sets whether to enable or disable polygon offset fill.
     * @param value - Turn on or off webgl polygon offset testing.
     */
    public setOffset(value: boolean): void
    {
        throw new Error("STUB");
    }

    /**
     * Sets whether to enable or disable depth test.
     * @param value - Turn on or off webgl depth testing.
     */
    public setDepthTest(value: boolean): void
    {
        throw new Error("STUB");
    }

    /**
     * Sets whether to enable or disable depth mask.
     * @param value - Turn on or off webgl depth mask.
     */
    public setDepthMask(value: boolean): void
    {
        throw new Error("STUB");
    }

    /**
     * Whether depth writes are currently enabled on the GL context, as last applied by this
     * system. `gl.clear` is masked by this state, so depth clears must consult it.
     * @internal
     */
    public get depthMaskEnabled(): boolean
    {
        throw new Error("STUB");
    }

    /**
     * Sets whether to enable or disable cull face.
     * @param {boolean} value - Turn on or off webgl cull face.
     */
    public setCullFace(value: boolean): void
    {
        throw new Error("STUB");
    }

    /**
     * Sets the gl front face.
     * @param {boolean} value - true is clockwise and false is counter-clockwise
     */
    public setFrontFace(value: boolean): void
    {
        throw new Error("STUB");
    }

    /**
     * Sets the blend mode.
     * @param {number} value - The blend mode to set to.
     */
    public setBlendMode(value: BLEND_MODES): void
    {
        if (!this.blendModesMap[value])
        {
            value = 'normal';
        }

        if (value === this.blendMode)
        {
            return;
        }

        this.blendMode = value;

        const mode = this.blendModesMap[value];
        const gl = this.gl;

        if (mode.length === 2)
        {
            gl.blendFunc(mode[0], mode[1]);
        }
        else
        {
            gl.blendFuncSeparate(mode[0], mode[1], mode[2], mode[3]);
        }

        if (mode.length === 6)
        {
            this._blendEq = true;
            gl.blendEquationSeparate(mode[4], mode[5]);
        }
        else if (this._blendEq)
        {
            this._blendEq = false;
            gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
        }
    }

    /**
     * Sets the polygon offset.
     * @param {number} value - the polygon offset
     * @param {number} scale - the polygon offset scale
     */
    public setPolygonOffset(value: number, scale: number): void
    {
        throw new Error("STUB");
    }

    /** Resets all the logic and disables the VAOs. */
    public resetState(): void
    {
        throw new Error("STUB");
    }

    /**
     * Checks to see which updates should be checked based on which settings have been activated.
     *
     * For example, if blend is enabled then we should check the blend modes each time the state is changed
     * or if polygon fill is activated then we need to check if the polygon offset changes.
     * The idea is that we only check what we have too.
     * @param func - the checking function to add or remove
     * @param value - should the check function be added or removed.
     */
    private _updateCheck(func: (system: this, state: State) => void, value: boolean): void
    {
        throw new Error("STUB");
    }

    /**
     * A private little wrapper function that we call to check the blend mode.
     * @param system - the System to perform the state check on
     * @param state - the state that the blendMode will pulled from
     */
    private static _checkBlendMode(system: GlStateSystem, state: State): void
    {
        throw new Error("STUB");
    }

    /**
     * A private little wrapper function that we call to check the polygon offset.
     * @param system - the System to perform the state check on
     * @param state - the state that the blendMode will pulled from
     */
    private static _checkPolygonOffset(system: GlStateSystem, state: State): void
    {
        throw new Error("STUB");
    }

    /** @ignore */
    public destroy(): void
    {
        this.gl = null;
        this.checks.length = 0;
    }
}
