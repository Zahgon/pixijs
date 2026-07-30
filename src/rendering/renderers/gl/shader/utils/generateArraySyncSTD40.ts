import { WGSL_TO_STD40_SIZE } from './createUboElementsSTD40';

import type { UboElement } from '../../../shared/shader/types';

/**
 * This generates a function that will sync an array to the uniform buffer
 * following the std140 layout
 * @param uboElement - the element to generate the array sync for
 * @param offsetToAdd - the offset to append at the start of the code
 * @returns - the generated code
 * @internal
 */
export function generateArraySyncSTD40(uboElement: UboElement, offsetToAdd: number): string
{
    throw new Error("STUB");
}
