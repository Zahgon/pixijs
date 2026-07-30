import { pointInTriangle } from '../../../maths/point/pointInTriangle';
import { Geometry } from '../../../rendering/renderers/shared/geometry/Geometry';
import { State } from '../../../rendering/renderers/shared/state/State';
import { Texture } from '../../../rendering/renderers/shared/texture/Texture';
import { deprecation, v8_0_0 } from '../../../utils/logging/deprecation';
import { ViewContainer } from '../../view/ViewContainer';
import { MeshGeometry } from './MeshGeometry';
import { type MeshGpuData } from './MeshPipe';
import '../init';

import type { PointData } from '../../../maths/point/PointData';
import type { Topology } from '../../../rendering/renderers/shared/geometry/const';
import type { Instruction } from '../../../rendering/renderers/shared/instructions/Instruction';
import type { Shader } from '../../../rendering/renderers/shared/shader/Shader';
import type { View } from '../../../rendering/renderers/shared/view/View';
import type { ContainerOptions } from '../../container/Container';
import type { DestroyOptions } from '../../container/destroyTypes';

/**
 * Shader that uses a texture.
 * This is the default shader used by `Mesh` when no shader is provided.
 * It is a simple shader that samples a texture and applies it to the geometry.
 * @category scene
 * @advanced
 */
export interface TextureShader extends Shader
{
    /** The texture that the shader uses. */
    texture: Texture;
}

/**
 * Constructor options used for `Mesh` instances. Extends {@link MeshViewOptions}
 * ```js
 * const mesh = new Mesh({
 *    texture: Texture.from('assets/image.png'),
 *    geometry: new PlaneGeometry(),
 *    shader: Shader.from(VERTEX, FRAGMENT),
 * });
 * ```
 * @see {@link Mesh}
 * @see {@link MeshViewOptions}
 * @category scene
 */

/**
 * Options for creating a Mesh instance.
 * @category scene
 * @advanced
 * @noInheritDoc
 */
export interface MeshOptions<
    GEOMETRY extends Geometry = MeshGeometry,
    SHADER extends Shader = TextureShader
> extends PixiMixins.MeshOptions, ContainerOptions
{
    /**
     * Includes vertex positions, face indices, colors, UVs, and
     * custom attributes within buffers, reducing the cost of passing all
     * this data to the GPU. Can be shared between multiple Mesh objects.
     */
    geometry: GEOMETRY;
    /**
     * Represents the vertex and fragment shaders that processes the geometry and runs on the GPU.
     * Can be shared between multiple Mesh objects.
     */
    shader?: SHADER | null;
    /** The state of WebGL required to render the mesh. */
    state?: State;
    /** The texture that the Mesh uses. Null for non-MeshMaterial shaders */
    texture?: Texture;
    /** Whether or not to round the x/y position. */
    roundPixels?: boolean;
}
// eslint-disable-next-line requireExport/require-export-jsdoc, requireMemberAPI/require-member-api-doc
export interface Mesh extends PixiMixins.Mesh, ViewContainer<MeshGpuData> {}

/**
 * Base mesh class.
 *
 * This class empowers you to have maximum flexibility to render any kind of WebGL/WebGPU visuals you can think of.
 * This class assumes a certain level of WebGL/WebGPU knowledge.
 * If you know a bit this should abstract enough away to make your life easier!
 *
 * Pretty much ALL WebGL/WebGPU can be broken down into the following:
 * - Geometry - The structure and data for the mesh. This can include anything from positions, uvs, normals, colors etc..
 * - Shader - This is the shader that PixiJS will render the geometry with (attributes in the shader must match the geometry)
 * - State - This is the state of WebGL required to render the mesh.
 *
 * Through a combination of the above elements you can render anything you want, 2D or 3D!
 * @category scene
 * @advanced
 */
export class Mesh<
    GEOMETRY extends Geometry = MeshGeometry,
    SHADER extends Shader = TextureShader
> extends ViewContainer<MeshGpuData> implements View, Instruction
{
    /** @internal */
    public override readonly renderPipeId: string = 'mesh';
    public state: State;

    /** @internal */
    public _texture: Texture;
    /** @internal */
    public _geometry: GEOMETRY;
    /** @internal */
    public _shader: SHADER | null = null;
    /**
     * @param {MeshOptions} options - options for the mesh instance
     */
    constructor(options: MeshOptions<GEOMETRY, SHADER>);
    /** @deprecated since 8.0.0 */
    constructor(geometry: GEOMETRY, shader: SHADER, state?: State, drawMode?: Topology);
    constructor(...args: [MeshOptions<GEOMETRY, SHADER>] | [GEOMETRY, SHADER, State?, Topology?])
    {
        throw new Error("STUB");
    }

    /** Alias for {@link Mesh#shader}. */
    get material()
    {
        throw new Error("STUB");
    }

    /**
     * Represents the vertex and fragment shaders that processes the geometry and runs on the GPU.
     * Can be shared between multiple Mesh objects.
     */
    set shader(value: SHADER | null)
    {
        throw new Error("STUB");
    }

    get shader(): SHADER | null
    {
        throw new Error("STUB");
    }

    /**
     * Includes vertex positions, face indices, colors, UVs, and
     * custom attributes within buffers, reducing the cost of passing all
     * this data to the GPU. Can be shared between multiple Mesh objects.
     */
    set geometry(value: GEOMETRY)
    {
        throw new Error("STUB");
    }

    get geometry()
    {
        throw new Error("STUB");
    }

    /** The texture that the Mesh uses. Null for non-MeshMaterial shaders */
    set texture(value: Texture)
    {
        value ||= Texture.EMPTY;

        const currentTexture = this._texture;

        if (currentTexture === value) return;

        if (currentTexture && currentTexture.dynamic) currentTexture.off('update', this.onViewUpdate, this);
        if (value.dynamic) value.on('update', this.onViewUpdate, this);

        if (this.shader)
        {
            (this.shader as unknown as TextureShader).texture = value;
        }

        this._texture = value;
        this.onViewUpdate();
    }

    get texture()
    {
        return this._texture;
    }

    get batched()
    {
        throw new Error("STUB");
    }

    /**
     * The local bounds of the mesh.
     * @type {Bounds}
     */
    override get bounds()
    {
        throw new Error("STUB");
    }

    /**
     * Update local bounds of the mesh.
     * @private
     */
    protected updateBounds()
    {
        throw new Error("STUB");
    }

    /**
     * Checks if the object contains the given point.
     * @param point - The point to check
     */
    public override containsPoint(point: PointData)
    {
        throw new Error("STUB");
    }

    /**
     * Destroys this sprite renderable and optionally its texture.
     * @param options - Options parameter. A boolean will act as if all options
     *  have been set to that value
     * @example
     * mesh.destroy();
     * mesh.destroy(true);
     * mesh.destroy({ texture: true, textureSource: true });
     */
    public override destroy(options?: DestroyOptions): void
    {
        super.destroy(options);

        const destroyTexture = typeof options === 'boolean' ? options : options?.texture;

        if (destroyTexture)
        {
            const destroyTextureSource = typeof options === 'boolean' ? options : options?.textureSource;

            this._texture.destroy(destroyTextureSource);
        }

        this._geometry?.off('update', this.onViewUpdate, this);

        this._texture = null;
        this._geometry = null;
        this._shader = null;
    }
}
