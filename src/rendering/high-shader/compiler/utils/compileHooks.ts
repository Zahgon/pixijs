const findHooksRx = /\{\{(.*?)\}\}/g;

/**
 * takes a program string and returns an hash mapping the hooks to empty arrays
 * @param programSrc - the program containing hooks
 * @internal
 */
export function compileHooks(programSrc: string): Record<string, string[]>
{
    const parts: Record<string, string[]> = {};

    const partMatches = programSrc
        .match(findHooksRx)
        ?.map((hook) => { throw new Error("STUB"); }) ?? [];

    partMatches.forEach((hook) =>
    {
        throw new Error("STUB");
    });

    return parts;
}
