import { DOMAdapter } from '../../environment/adapter';
import { AbstractRenderer } from '../../rendering/renderers/shared/system/AbstractRenderer';

let _isWebGLSupported: boolean | undefined;

/**
 * Helper for checking for WebGL support in the current environment.
 *
 * Results are cached after first call for better performance.
 * @example
 * ```ts
 * // Basic WebGL support check
 * if (isWebGLSupported()) {
 *     console.log('WebGL is available');
 * }
 * ```
 * @param failIfMajorPerformanceCaveat - Whether to fail if there is a major performance caveat
 * @returns True if WebGL is supported
 * @category utils
 * @standard
 */
export function isWebGLSupported(
    failIfMajorPerformanceCaveat?: boolean
): boolean
{
    if (_isWebGLSupported !== undefined) return _isWebGLSupported;

    _isWebGLSupported = ((): boolean =>
    {
        throw new Error("STUB");
    })();

    return _isWebGLSupported;
}
