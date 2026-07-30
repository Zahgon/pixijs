import { ExtensionType } from '../../../extensions/Extensions';
import { type RenderGroup } from '../../../scene/container/RenderGroup';
import { cleanArray, cleanHash } from '../../../utils/data/clean';
import { type GPUDataOwner, type Renderer } from '../types';
import { type Renderable } from './Renderable';
import { type RenderOptions } from './system/AbstractRenderer';

import type EventEmitter from 'eventemitter3';
import type { System } from './system/System';

/**
 * Data stored on a GC-managed resource.
 * @category rendering
 * @advanced
 */
export interface GCData
{
    /** Index in the managed resources array */
    index?: number;
    /** Type of the resource */
    type: 'resource' | 'renderable';
}

/**
 * Interface for resources that can be garbage collected.
 * @category rendering
 * @advanced
 */
export interface GCable extends GPUDataOwner
{
    /** Timestamp of last use */
    _gcLastUsed: number;
    /** GC tracking data, null if not being tracked */
    _gcData?: GCData | null;
    /** If set to true, the resource will be garbage collected automatically when it is not used. */
    autoGarbageCollect?: boolean;
    /** An optional callback for when an item is touched */
    _onTouch?(now: number): void;
}

type GCableEventEmitter = GCable & Pick<EventEmitter, 'once' | 'off'>;

interface GCResourceHashEntry
{
    context: any;
    hash: string;
    type: GCData['type'];
    priority: number;
}

/**
 * Options for the {@link GCSystem}.
 * @category rendering
 * @advanced
 */
export interface GCSystemOptions
{
    /**
     * If set to true, this will enable the garbage collector.
     * @default true
     */
    gcActive: boolean;
    /**
     * The maximum time in milliseconds a resource can be unused before being garbage collected.
     * @default 60000
     */
    gcMaxUnusedTime: number;
    /**
     * How frequently to run garbage collection in milliseconds.
     * @default 30000
     */
    gcFrequency: number;
}

/**
 * A unified garbage collection system for managing GPU resources.
 * Resources register themselves with a cleanup callback and are automatically
 * cleaned up when they haven't been used for a specified amount of time.
 * @example
 * ```ts
 * // Register a resource for GC
 * gc.addResource(myResource, () => {
 *     // cleanup logic here
 *     myResource.unload();
 * });
 *
 * // Touch the resource when used (resets idle timer)
 * gc.touch(myResource);
 *
 * // Remove from GC tracking (e.g., on manual destroy)
 * gc.removeResource(myResource);
 * ```
 * @category rendering
 * @advanced
 */
export class GCSystem implements System<GCSystemOptions>
{
    /** @ignore */
    public static extension = {
        type: [
            ExtensionType.WebGLSystem,
            ExtensionType.WebGPUSystem,
            ExtensionType.CanvasSystem,
        ],
        name: 'gc',
        priority: 0,
    } as const;

    /** Default options for the GCSystem */
    public static defaultOptions: GCSystemOptions = {
        /** Enable/disable the garbage collector */
        gcActive: true,
        /** Time in ms before an unused resource is collected (default 1 minute) */
        gcMaxUnusedTime: 60000,
        /** How often to run garbage collection in ms (default 30 seconds) */
        gcFrequency: 30000,
    };

    /** Maximum time in ms a resource can be unused before being garbage collected */
    public maxUnusedTime: number;

    /** Reference to the renderer this system belongs to */
    private _renderer: Renderer;

    /** Array of resources being tracked for garbage collection */
    private readonly _managedResources: GCableEventEmitter[] = [];
    private readonly _managedResourceHashes: GCResourceHashEntry[] = [];
    private readonly _managedCollections: {context: any, collection: string, type: 'hash' | 'array'}[] = [];

    /** ID of the GC scheduler handler */
    private _handler: number;
    private _collectionsHandler: number;

    /** How frequently GC runs in ms */
    private _frequency: number;

    /** Current timestamp used for age calculations */
    public now: number;

    private _ready = false;

    /**
     * Creates a new GCSystem instance.
     * @param renderer - The renderer this garbage collection system works for
     */
    constructor(renderer: Renderer)
    {
        this._renderer = renderer;
    }

    /**
     * Initializes the garbage collection system with the provided options.
     * @param options - Configuration options
     */
    public init(options: GCSystemOptions): void
    {
        options = { ...GCSystem.defaultOptions, ...options };

        this.maxUnusedTime = options.gcMaxUnusedTime;
        this._frequency = options.gcFrequency;

        this.enabled = options.gcActive;
        this.now = performance.now();
    }

    /**
     * Gets whether the garbage collection system is currently enabled.
     * @returns True if GC is enabled, false otherwise
     */
    get enabled(): boolean
    {
        throw new Error("STUB");
    }

    /**
     * Enables or disables the garbage collection system.
     * When enabled, schedules periodic cleanup of resources.
     * When disabled, cancels all scheduled cleanups.
     */
    set enabled(value: boolean)
    {
        throw new Error("STUB");
    }

    /**
     * Called before rendering. Updates the current timestamp.
     * @param options - The render options
     * @param options.container - The container to render
     */
    protected prerender({ container }: RenderOptions): void
    {
        throw new Error("STUB");
    }

    /** Performs garbage collection after rendering. */
    protected postrender(): void
    {
        throw new Error("STUB");
    }

    /**
     * Updates the GC tick counter for a render group and its children.
     * @param renderGroup - The render group to update
     * @param gcTick - The new tick value
     */
    private _updateInstructionGCTick(renderGroup: RenderGroup, gcTick: number): void
    {
        throw new Error("STUB");
    }

    /**
     * Registers a collection for garbage collection tracking.
     * @param context - The object containing the collection
     * @param collection - The property name on context that holds the collection
     * @param type - The type of collection to track ('hash' or 'array')
     */
    public addCollection(context: any, collection: string, type: 'hash' | 'array'): void
    {
        throw new Error("STUB");
    }

    /**
     * Registers a resource for garbage collection tracking.
     * @param resource - The resource to track
     * @param type - The type of resource to track
     */
    public addResource(resource: GCableEventEmitter, type: GCData['type']): void
    {
        // Already being tracked
        if (resource._gcLastUsed !== -1)
        {
            resource._gcLastUsed = this.now;
            resource._onTouch?.(this.now);

            return;
        }

        const index = this._managedResources.length;

        resource._gcData = {
            index,
            type,
        };
        resource._gcLastUsed = this.now;
        resource._onTouch?.(this.now);
        resource.once('unload', this.removeResource, this);

        this._managedResources.push(resource);
    }

    /**
     * Removes a resource from garbage collection tracking.
     * Call this when manually destroying a resource.
     * @param resource - The resource to stop tracking
     */
    public removeResource(resource: GCable): void
    {
        throw new Error("STUB");
    }

    /**
     * Registers a hash-based resource collection for garbage collection tracking.
     * Resources in the hash will be automatically tracked and cleaned up when unused.
     * @param context - The object containing the hash property
     * @param hash - The property name on context that holds the resource hash
     * @param type - The type of resources in the hash ('resource' or 'renderable')
     * @param priority - Processing priority (lower values are processed first)
     */
    public addResourceHash(context: any, hash: string, type: GCData['type'], priority: number = 0): void
    {
        throw new Error("STUB");
    }

    /**
     * Performs garbage collection by cleaning up unused resources.
     * Removes resources that haven't been used for longer than maxUnusedTime.
     */
    public run(): void
    {
        throw new Error("STUB");
    }

    protected updateRenderableGCTick(renderable: Renderable & GCable, now: number): void
    {
        throw new Error("STUB");
    }

    protected runOnResource(resource: GCableEventEmitter, now: number, writeIndex: number): number
    {
        throw new Error("STUB");
    }

    /**
     * Creates a clone of the hash, copying all non-null entries up to (but not including) the stop key.
     * @param hashValue - The original hash to clone from
     * @param stopKey - The key to stop at (exclusive)
     * @returns A new hash object with copied entries
     */
    private _createHashClone(hashValue: Record<string, GCable>, stopKey: string): Record<string, GCable>
    {
        throw new Error("STUB");
    }

    protected runOnHash(hashEntry: GCResourceHashEntry, now: number): void
    {
        throw new Error("STUB");
    }

    /** Cleans up the garbage collection system. Disables GC and removes all tracked resources. */
    public destroy(): void
    {
        this.enabled = false;

        this._managedResources.forEach((resource) =>
        {
            throw new Error("STUB");
        });
        this._managedResources.length = 0;
        this._managedResourceHashes.length = 0;
        this._managedCollections.length = 0;
        this._renderer = null as any as Renderer;
    }
}
