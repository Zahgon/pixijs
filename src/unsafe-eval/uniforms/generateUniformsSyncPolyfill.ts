import { uniformParsers } from '../../rendering/renderers/shared/shader/utils/uniformParsers';
import { uniformArrayParserFunctions, uniformParserFunctions, uniformSingleParserFunctions } from './uniformSyncFunctions';

import type { GlUniformData } from '../../rendering/renderers/gl/shader/GlProgram';
import type { WebGLRenderer } from '../../rendering/renderers/gl/WebGLRenderer';
import type { UniformsSyncCallback } from '../../rendering/renderers/shared/shader/types';
import type { UniformGroup } from '../../rendering/renderers/shared/shader/UniformGroup';
import type { UniformUploadFunction } from './uniformSyncFunctions';

/**
 * @param group
 * @param uniformData
 * @internal
 */
export function generateUniformsSyncPolyfill(
    group: UniformGroup,
    uniformData: Record<string, GlUniformData>
): UniformsSyncCallback
{
    throw new Error("STUB");
}
