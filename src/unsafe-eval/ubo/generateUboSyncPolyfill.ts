import { WGSL_TO_STD40_SIZE } from '../../rendering/renderers/gl/shader/utils/createUboElementsSTD40';
import { WGSL_ALIGN_SIZE_DATA } from '../../rendering/renderers/gpu/shader/utils/createUboElementsWGSL';
import { uniformParsers } from '../../rendering/renderers/shared/shader/utils/uniformParsers';
import { uboParserFunctions, uboSingleFunctionsSTD40, uboSingleFunctionsWGSL } from './uboSyncFunctions';

import type { UboElement, UniformsSyncCallback } from '../../rendering/renderers/shared/shader/types';
import type { UniformGroup } from '../../rendering/renderers/shared/shader/UniformGroup';
import type { UboUploadFunction } from './uboSyncFunctions';

/**
 * @param uboElements
 * @internal
 */
export function generateUboSyncPolyfillSTD40(uboElements: UboElement[]): UniformsSyncCallback
{
    throw new Error("STUB");
}

/**
 * @param uboElements
 * @internal
 */
export function generateUboSyncPolyfillWGSL(uboElements: UboElement[]): UniformsSyncCallback
{
    throw new Error("STUB");
}

function generateUboSyncPolyfill(
    uboElements: UboElement[],
    uboFunctions: Record<string, UboUploadFunction>,
    arrayUploadFunction: (uboElement: UboElement) => UboUploadFunction
): UniformsSyncCallback
{
    throw new Error("STUB");
}
