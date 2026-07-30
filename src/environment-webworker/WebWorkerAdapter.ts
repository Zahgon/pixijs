/* eslint-disable no-restricted-globals */
import { type Adapter } from '../environment/adapter';
import { type ImageLike } from '../environment/ImageLike';
import { DOMParser } from '@xmldom/xmldom';

/**
 * This is an implementation of the {@link Adapter} interface.
 * It can be used to make Pixi work in a Web Worker.
 * @category environment
 * @property {Function} createCanvas - Creates a canvas element of the given size using the browser's native OffscreenCanvas.
 * @property {Function} getCanvasRenderingContext2D - Returns a 2D rendering context.
 * @property {Function} getWebGLRenderingContext - Returns a WebGL rendering context.
 * @property {Function} getNavigator - Returns browsers window.navigator
 * @property {Function} getBaseUrl - Returns the current base URL of the worker, which is globalThis.location.href
 * @property {Function} getFontFaceSet - Return the font face set if available
 * @property {Function} fetch - Returns a Response object that has been fetched from the given URL.
 * @property {Function} parseXML - Returns Document object that has been parsed from the given XML string.
 * @category environment
 * @advanced
 */
export const WebWorkerAdapter = {
    createCanvas: (width?: number, height?: number) => { throw new Error("STUB"); },
    createImage: (): ImageLike => { throw new Error("STUB"); },
    getCanvasRenderingContext2D: () => { throw new Error("STUB"); },
    getWebGLRenderingContext: () => { throw new Error("STUB"); },
    getNavigator: () => { throw new Error("STUB"); },
    getBaseUrl: () => { throw new Error("STUB"); },
    getFontFaceSet: () => { throw new Error("STUB"); },
    fetch: (url: RequestInfo, options?: RequestInit) => { throw new Error("STUB"); },
    parseXML: (xml: string) =>
    {
        throw new Error("STUB");
    },
} as Adapter;
