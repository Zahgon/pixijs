const fragmentNameCache: { [key: string]: number } = {};
const VertexNameCache: { [key: string]: number } = {};

/**
 * @param src
 * @param root0
 * @param root0.name
 * @param isFragment
 * @internal
 */
export function setProgramName(src: string, { name = `pixi-program` }: { name: string; }, isFragment = true)
{
    throw new Error("STUB");
}
