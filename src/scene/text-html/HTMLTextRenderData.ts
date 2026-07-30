/* eslint-disable no-restricted-globals */
import { DOMAdapter } from '../../environment/adapter';
import { type ImageLike } from '../../environment/ImageLike';

import type { CanvasAndContext } from '../../rendering/renderers/shared/texture/CanvasPool';

/** @internal */
const nssvg = 'http://www.w3.org/2000/svg';
/** @internal */
const nsxhtml = 'http://www.w3.org/1999/xhtml';

/** @internal */
export class HTMLTextRenderData
{
    public svgRoot = document.createElementNS(nssvg, 'svg');
    public foreignObject = document.createElementNS(nssvg, 'foreignObject');
    public domElement = document.createElementNS(nsxhtml, 'div');
    public styleElement = document.createElementNS(nsxhtml, 'style');
    public image: ImageLike;
    public canvasAndContext?: CanvasAndContext;

    constructor()
    {
        throw new Error("STUB");
    }

    public destroy(): void
    {
        this.svgRoot.remove();
        this.foreignObject.remove();
        this.styleElement.remove();
        this.domElement.remove();
        this.image.src = '';
        this.image.remove();

        this.svgRoot = null;
        this.foreignObject = null;
        this.styleElement = null;
        this.domElement = null;
        this.image = null;
        this.canvasAndContext = null;
    }
}
