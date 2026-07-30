import { type Renderer } from '../rendering/renderers/types';
import { UPDATE_PRIORITY } from '../ticker/const';
import { Ticker } from '../ticker/Ticker';

/**
 * CanvasObserver class synchronizes the DOM element's transform with the canvas size and position.
 * It uses ResizeObserver for efficient updates and requestAnimationFrame for fallback.
 * This ensures that the DOM element is always correctly positioned and scaled relative to the canvas.
 * @internal
 */
export class CanvasObserver
{
    /** A cached value of the last transform applied to the DOM element. */
    private _lastTransform = '';
    /** A ResizeObserver instance to observe changes in the canvas size. */
    private _observer: ResizeObserver | null = null;
    /** The canvas element that this observer is associated with. */
    private _canvas: HTMLCanvasElement;
    /** The DOM element that will be transformed based on the canvas size and position. */
    private readonly _domElement: HTMLElement;
    /** The renderer instance that this observer is associated with. */
    private readonly _renderer: Renderer;
    /** The last scale values applied to the DOM element, used to avoid unnecessary updates. */
    private _lastScaleX: number;
    /** The last scale values applied to the DOM element, used to avoid unnecessary updates. */
    private _lastScaleY: number;
    /** A flag to indicate whether the observer is attached to the Ticker for continuous updates. */
    private _tickerAttached = false;

    constructor(options: { domElement: HTMLElement; renderer: Renderer })
    {
        throw new Error("STUB");
    }

    /** The canvas element that this CanvasObserver is associated with. */
    public get canvas(): HTMLCanvasElement
    {
        return this._canvas;
    }

    /** Attaches the DOM element to the canvas parent if it is not already attached. */
    public ensureAttached()
    {
        if (!this._domElement.parentNode && this._canvas.parentNode)
        {
            this._canvas.parentNode.appendChild(this._domElement);
            this.updateTranslation();
        }
    }

    /**
     * Updates the transform of the DOM element based on the canvas size and position.
     * This method calculates the scale and translation needed to keep the DOM element in sync with the canvas.
     */
    public readonly updateTranslation = () =>
    {
        throw new Error("STUB");
    };

    /** Sets up a ResizeObserver if available. This ensures that the DOM element is kept in sync with the canvas size . */
    private _attachObserver()
    {
        throw new Error("STUB");
    }

    /** Destroys the CanvasObserver instance, cleaning up observers and Ticker. */
    public destroy()
    {
        if (this._observer)
        {
            this._observer.disconnect();
            this._observer = null;
        }
        else if (this._tickerAttached)
        {
            Ticker.shared.remove(this.updateTranslation);
        }

        (this._domElement as null) = null;
        (this._renderer as null) = null;
        this._canvas = null;
        this._tickerAttached = false;
        this._lastTransform = '';
        this._lastScaleX = null;
        this._lastScaleY = null;
    }
}
