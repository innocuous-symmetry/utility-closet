export default class Queue<TData> extends Array<TData> {
    constructor(...items: TData[]) {
        super(...items);
    }

    public get isEmpty() {
        return this.length == 0;
    }

    public get isNotEmpty() {
        return this.length > 0;
    }

    public enqueue(item: TData) {
        this.push(item);
        return this;
    }

    public dequeue() {
        return this.shift();
    }

    public async* walk({ interval = 1000, chunkSize = 1 }) {
        while (this.isNotEmpty) {
            const item = this.getChunk(chunkSize);
            await new Promise(resolve => setTimeout(resolve, interval));
            yield item;
        }
    }

    private getChunk(length: number) {
        const chunk = [];

        while (chunk.length < length && this.isNotEmpty) {
            const data = this.dequeue();
            if (data) chunk.push(data);
        }

        return chunk satisfies TData[];
    }
}
