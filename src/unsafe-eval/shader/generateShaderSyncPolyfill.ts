import { BufferResource } from '../../rendering/renderers/shared/buffer/BufferResource';
import { UniformGroup } from '../../rendering/renderers/shared/shader/UniformGroup';
import { TextureSource } from '../../rendering/renderers/shared/texture/sources/TextureSource';
import { TextureStyle } from '../../rendering/renderers/shared/texture/TextureStyle';
import { TextureView } from '../../rendering/renderers/shared/texture/TextureView';

import type { ShaderSyncData, ShaderSyncFunction } from '../../rendering/renderers/gl/shader/GlShaderSystem';
import type { WebGLRenderer } from '../../rendering/renderers/gl/WebGLRenderer';
import type { Shader } from '../../rendering/renderers/shared/shader/Shader';

/** @internal */
export function generateShaderSyncPolyfill(): ShaderSyncFunction
{
    throw new Error("STUB");
}

function syncShader(renderer: WebGLRenderer, shader: Shader, syncData: ShaderSyncData): void
{
    throw new Error("STUB");
}
