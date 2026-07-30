import { Buffer } from '../../renderers/shared/buffer/Buffer';
import { BufferUsage } from '../../renderers/shared/buffer/const';
import { Geometry } from '../../renderers/shared/geometry/Geometry';

const placeHolderBufferData = new Float32Array(1);
const placeHolderIndexData = new Uint32Array(1);

/**
 * This class represents a geometry used for batching in the rendering system.
 * It defines the structure of vertex attributes and index buffers for batched rendering.
 * @category rendering
 * @advanced
 */
export class BatchGeometry extends Geometry
{
    constructor()
    {
        throw new Error("STUB");
    }
}

