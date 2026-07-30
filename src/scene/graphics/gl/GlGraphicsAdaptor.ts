import { ExtensionType } from '../../../extensions/Extensions';
import { Matrix } from '../../../maths/matrix/Matrix';
import { compileHighShaderGlProgram } from '../../../rendering/high-shader/compileHighShaderToProgram';
import { colorBitGl } from '../../../rendering/high-shader/shader-bits/colorBit';
import { generateTextureBatchBitGl } from '../../../rendering/high-shader/shader-bits/generateTextureBatchBit';
import { localUniformBitGl } from '../../../rendering/high-shader/shader-bits/localUniformBit';
import { roundPixelsBitGl } from '../../../rendering/high-shader/shader-bits/roundPixelsBit';
import { getBatchSamplersUniformGroup } from '../../../rendering/renderers/gl/shader/getBatchSamplersUniformGroup';
import { Shader } from '../../../rendering/renderers/shared/shader/Shader';
import { UniformGroup } from '../../../rendering/renderers/shared/shader/UniformGroup';
import { type Renderer } from '../../../rendering/renderers/types';

import type { Batch } from '../../../rendering/batcher/shared/Batcher';
import type { WebGLRenderer } from '../../../rendering/renderers/gl/WebGLRenderer';
import type { Graphics } from '../shared/Graphics';
import type { GraphicsContextSystem } from '../shared/GraphicsContextSystem';
import type { GraphicsAdaptor, GraphicsPipeLike } from '../shared/GraphicsPipe';

/**
 * A GraphicsAdaptor that uses WebGL to render graphics.
 * @category rendering
 * @ignore
 */
export class GlGraphicsAdaptor implements GraphicsAdaptor
{
    /** @ignore */
    public static extension = {
        type: [
            ExtensionType.WebGLPipesAdaptor,
        ],
        name: 'graphics',
    } as const;

    public shader: Shader;

    public contextChange(renderer: Renderer): void
    {
        throw new Error("STUB");
    }

    public execute(graphicsPipe: GraphicsPipeLike, renderable: Graphics): void
    {
        const context = renderable.context;
        const shader = context.customShader || this.shader;
        const renderer = graphicsPipe.renderer as WebGLRenderer;
        const contextSystem = renderer.graphicsContext as GraphicsContextSystem;

        const {
            batcher, instructions,
        } = contextSystem.getContextRenderData(context);

        // WebGL specific..
        shader.groups[0] = renderer.globalUniforms.bindGroup;

        renderer.state.set(graphicsPipe.state);

        renderer.shader.bind(shader);

        renderer.geometry.bind(batcher.geometry, shader.glProgram);

        const batches = instructions.instructions as Batch[];

        for (let i = 0; i < instructions.instructionSize; i++)
        {
            const batch = batches[i];

            if (batch.size)
            {
                for (let j = 0; j < batch.textures.count; j++)
                {
                    renderer.texture.bind(batch.textures.textures[j], j);
                }

                renderer.geometry.draw(batch.topology, batch.size, batch.start);
            }
        }
    }

    public destroy(): void
    {
        this.shader.destroy(true);
        this.shader = null;
    }
}
