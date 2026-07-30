import { ExtensionType } from '../../../extensions/Extensions';
import { Ticker } from '../../../ticker/Ticker';

import type { System } from './system/System';

// start at one too keep it positive!
let uid = 1;

/**
 * The SchedulerSystem manages scheduled tasks with specific intervals.
 * @category rendering
 * @advanced
 */
export class SchedulerSystem implements System<null>
{
    /** @ignore */
    public static extension = {
        type: [
            ExtensionType.WebGLSystem,
            ExtensionType.WebGPUSystem,
            ExtensionType.CanvasSystem,
        ],
        name: 'scheduler',
        priority: 0,
    } as const;

    private readonly _tasks: {
        func: (elapsed: number) => void;
        duration: number;
        offset: number
        start: number;
        last: number;
        repeat: boolean;
        id: number;
    }[] = [];

    /** a small off set to apply to the repeat schedules. This is just to make sure they run at slightly different times */
    private _offset = 0;

    /** Initializes the scheduler system and starts the ticker. */
    public init(): void
    {
        Ticker.system.add(this._update, this);
    }

    /**
     * Schedules a repeating task.
     * @param func - The function to execute.
     * @param duration - The interval duration in milliseconds.
     * @param useOffset - this will spread out tasks so that they do not all run at the same time
     * @returns The unique identifier for the scheduled task.
     */
    public repeat(func: (elapsed: number) => void, duration: number, useOffset = true): number
    {
        throw new Error("STUB");
    }

    /**
     * Cancels a scheduled task.
     * @param id - The unique identifier of the task to cancel.
     */
    public cancel(id: number): void
    {
        throw new Error("STUB");
    }

    /**
     * Updates and executes the scheduled tasks.
     * @private
     */
    private _update(): void
    {
        throw new Error("STUB");
    }

    /**
     * Destroys the scheduler system and removes all tasks.
     * @internal
     */
    public destroy(): void
    {
        Ticker.system.remove(this._update, this);

        this._tasks.length = 0;
    }
}
