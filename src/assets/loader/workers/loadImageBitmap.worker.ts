interface MessageData
{
    data: any[];
    uuid: number;
    id: string;
}

async function loadImageBitmap(url: string, alphaMode?: string)
{
    const response = await fetch(url);

    if (!response.ok)
    {
        throw new Error(`[WorkerManager.loadImageBitmap] Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }

    const imageBlob = await response.blob();

    return alphaMode === 'premultiplied-alpha'
        ? createImageBitmap(imageBlob, { premultiplyAlpha: 'none' })
        : createImageBitmap(imageBlob);
}
self.onmessage = async (event: MessageEvent<MessageData>) =>
{
    throw new Error("STUB");
};
