/* eslint-disable no-restricted-globals */
import { ExtensionType } from '../extensions/Extensions';
import { CanvasObserver } from './CanvasObserver';
import { type DOMContainer } from './DOMContainer';

import type { InstructionSet } from '../rendering/renderers/shared/instructions/InstructionSet';
import type { RenderPipe } from '../rendering/renderers/shared/instructions/RenderPipe';
import type { Renderer } from '../rendering/renderers/types';

/**
 * The DOMPipe class is responsible for managing and rendering DOM elements within a PixiJS scene.
 * It maps dom elements to the canvas and ensures they are correctly positioned and visible.
 * @internal
 */
export class DOMPipe implements RenderPipe<DOMContainer>
{
    /**
     * Static property defining the extension type and name for the DOMPipe.
     * This is used to register the DOMPipe with different rendering pipelines.
     */
    public static extension = {
        type: [
            ExtensionType.WebGLPipes,
            ExtensionType.WebGPUPipes,
            ExtensionType.CanvasPipes,
        ],
        name: 'dom',
    } as const;

    private _renderer: Renderer;

    /** Array to keep track of attached DOM elements */
    private readonly _attachedDomElements: DOMContainer[] = [];
    /** The main DOM element that acts as a container for other DOM elements */
    public readonly _domElement: HTMLDivElement;
    /** The CanvasTransformSync instance that keeps the DOM element in sync with the canvas */
    private _canvasObserver: CanvasObserver;

    /**
     * Constructor for the DOMPipe class.
     * @param renderer - The renderer instance that this DOMPipe will be associated with.
     */
    constructor(renderer: Renderer)
    {
        throw new Error("STUB");
    }

    /** Initializes the DOMPipe, setting up the main DOM element and adding it to the document body. */
    public init(): void
    {
        // Initialize the CanvasTransformSync to keep the DOM element in sync with the canvas
        this._canvasObserver = new CanvasObserver({
            domElement: this._domElement,
            renderer: this._renderer,
        });
    }

    /**
     * Adds a renderable DOM container to the list of attached elements.
     * @param domContainer - The DOM container to be added.
     * @param _instructionSet - The instruction set (unused).
     */
    public addRenderable(domContainer: DOMContainer, _instructionSet: InstructionSet): void
    {
        if (!this._attachedDomElements.includes(domContainer))
        {
            this._attachedDomElements.push(domContainer);
        }
    }

    /**
     * Updates a renderable DOM container.
     * @param _domContainer - The DOM container to be updated (unused).
     */
    public updateRenderable(_domContainer: DOMContainer): void
    {
        // Updates happen in postrender
    }

    /**
     * Validates a renderable DOM container.
     * @param _domContainer - The DOM container to be validated (unused).
     * @returns Always returns true as validation is not required.
     */
    public validateRenderable(_domContainer: DOMContainer): boolean
    {
        return true;
    }

    /** Handles the post-rendering process, ensuring DOM elements are correctly positioned and visible. */
    public postrender(): void
    {
        throw new Error("STUB");
    }

    /** Destroys the DOMPipe, removing all attached DOM elements and cleaning up resources. */
    public destroy(): void
    {
        this._renderer.runners.postrender.remove(this);

        for (let i = 0; i < this._attachedDomElements.length; i++)
        {
            const domContainer = this._attachedDomElements[i];

            domContainer.element?.remove();
        }

        this._attachedDomElements.length = 0;
        this._domElement.remove();
        this._canvasObserver.destroy();
        this._renderer = null;
    }
}
