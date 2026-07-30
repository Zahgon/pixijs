import { compileBufferSync } from '../../../shared/shader/utils/compileBufferSync';
import { uboSyncFunctionsSTD40 } from '../../../shared/shader/utils/uboSyncFunctions';
import { generateArraySyncSTD40 } from './generateArraySyncSTD40';

import type { UboElement, UniformsSyncCallback } from '../../../shared/shader/types';

/**
 * @param uboElements
 * @internal
 */
export function createUboSyncFunctionSTD40(
    uboElements: UboElement[],
): UniformsSyncCallback
{
    throw new Error("STUB");
}
