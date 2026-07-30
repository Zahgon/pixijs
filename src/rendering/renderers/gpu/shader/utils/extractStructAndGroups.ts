/**
 * The access mode for a buffer binding in WGSL
 * @category rendering
 * @advanced
 */
export type WgslAccessMode = 'uniform' | 'storage' | undefined;

/**
 * Defines the structure of the extracted WGSL structs and groups.
 * @category rendering
 * @advanced
 */
export interface StructsAndGroups
{
    groups: {
        group: number;
        binding: number;
        name: string;
        /** The access mode for buffer bindings: 'uniform', 'storage', or undefined for textures/samplers */
        accessMode: WgslAccessMode;
        type: string;
    }[];
    structs: {
        name: string;
        members: Record<string, string>;
    }[];
}

/**
 * @param wgsl
 * @internal
 */
export function extractStructAndGroups(wgsl: string): StructsAndGroups
{
    throw new Error("STUB");
}
