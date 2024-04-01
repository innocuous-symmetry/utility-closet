import { describe, assert, it } from "vitest";
import Queue from "../pkg/queue";

describe("queue", () => {
    it("should enqueue and dequeue items", () => {
        const queue = new Queue();

        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);

        assert(queue.dequeue() === 1);
        assert(queue.dequeue() === 2);
        assert(queue.dequeue() === 3);
    });

    it("should return undefined when dequeueing from an empty queue", () => {
        const queue = new Queue();

        assert(queue.dequeue() === undefined);
    });

    it("should return the correct length", () => {
        const queue = new Queue();

        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);

        assert(queue.length === 3);
    });
})

describe("Queue.walk", () => {
    it("should walk the queue", async () => {
        const queue = new Queue(1, 2, 3);

        const result = [];

        for await (const chunk of queue.walk({ interval: 0, chunkSize: 2 })) {
            result.push(chunk);
        }

        assert(result[0][0] === 1);
        assert(result[0][1] === 2);
        assert(result[1][0] === 3);
    });

    it("should allow for a custom interval", async () => {
        const data = Array.from({ length: 100 }).map((_, i) => i);
        const queue = new Queue(...data);
        const result: number[][] = [];
        const generator = queue.walk({ interval: 100, chunkSize: 10 });
        
        const start = Date.now();

        for await (const chunk of generator) {
            result.push(chunk);
        }

        const stop = Date.now();
        const diff = stop - start;

        assert(diff <= 1100 && diff >= 900, `Expected diff in range 900-1100ms, got ${diff.toString()}`);
        assert(result.length == 10, "Expected data to be processed in exactly 10 chunks");
    });
})
