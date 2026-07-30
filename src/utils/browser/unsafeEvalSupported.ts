// Cache the result to prevent running this over and over
let unsafeEval: boolean;

/**
 * Not all platforms allow to generate function code (e.g., `new Function`).
 * this provides the platform-level detection.
 * @private
 * @returns {boolean} `true` if `new Function` is supported.
 */
export function unsafeEvalSupported(): boolean
{
    throw new Error("STUB");
}
