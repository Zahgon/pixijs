import type { Matrix } from '../../../maths/matrix/Matrix';
import type { Batch, Batcher } from '../../../rendering/batcher/shared/Batcher';
import type { DefaultBatchableMeshElement } from '../../../rendering/batcher/shared/DefaultBatcher';
import type { Topology } from '../../../rendering/renderers/shared/geometry/const';
import type { Texture } from '../../../rendering/renderers/shared/texture/Texture';
import type { ViewContainer } from '../../view/ViewContainer';
import type { MeshGeometry } from './MeshGeometry';

/**
 * A batchable mesh object.
 * @ignore
 */
export class BatchableMesh implements DefaultBatchableMeshElement
{
    public batcherName = 'default';

    public _topology: Topology;

    public readonly packAsQuad = false;
    public location: number;

    public renderable: ViewContainer;

    public indexOffset = 0;
    public attributeOffset = 0;

    public texture: Texture;
    public geometry: MeshGeometry;
    public transform: Matrix;
    public roundPixels: 0 | 1 = 0;

    public _attributeStart: number;
    public _batcher: Batcher = null;
    public _batch: Batch = null;
    public _indexStart: number;
    public _textureId: number;
    public _textureMatrixUpdateId: number = -1;

    private _transformedUvs: Float32Array;
    private _uvUpdateId: number = -1;

    get blendMode() {
        throw new Error("STUB");
    }

    get topology() {
        throw new Error("STUB");
    }
    set topology(value: Topology) {
        throw new Error("STUB");
    }

    public reset()
    {
        this.renderable = null;
        this.texture = null;
        this._batcher = null;
        this._batch = null;
        this.geometry = null;
        this._uvUpdateId = -1;
        this._textureMatrixUpdateId = -1;
    }

    /**
     * Sets the texture for the batchable mesh.
     * As it does so, it resets the texture matrix update ID.
     * this is to ensure that the texture matrix is recalculated when the uvs are referenced
     * @param value - The texture to set.
     */
    public setTexture(value: Texture)
    {
        if (this.texture === value) return;

        this.texture = value;
        this._textureMatrixUpdateId = -1;
    }

    get uvs()
    {
        throw new Error("STUB");
    }

    get positions()
    {
        throw new Error("STUB");
    }

    get indices()
    {
        throw new Error("STUB");
    }

    get color()
    {
        throw new Error("STUB");
    }

    get groupTransform()
    {
        throw new Error("STUB");
    }

    get attributeSize()
    {
        throw new Error("STUB");
    }

    get indexSize()
    {
        throw new Error("STUB");
    }
}
