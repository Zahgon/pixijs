function extractInputs(fragmentSource: string, out: string[])
{
    let match;
    const regex = /@in\s+([^;]+);/g;

    while ((match = regex.exec(fragmentSource)) !== null)
    {
        out.push(match[1]);
    }
}

/**
 * @param fragments
 * @param template
 * @param sort
 * @internal
 */
export function compileInputs(fragments: any[], template: string, sort = false)
{
    // get all the inputs from the fragments..
    const results: string[] = [];

    extractInputs(template, results);

    fragments.forEach((fragment) =>
    {
        throw new Error("STUB");
    });

    // build the input:
    const mainInput = results;

    if (sort)
    {
        mainInput.sort();
    }

    const finalString = mainInput
        .map((inValue, i) => { throw new Error("STUB"); })
        .join('\n');

    // Remove lines from original string
    let cleanedString = template.replace(/@in\s+[^;]+;\s*/g, '');

    cleanedString = cleanedString.replace('{{in}}', `\n${finalString}\n`);

    return cleanedString;
}
