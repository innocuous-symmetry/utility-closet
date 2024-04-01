import { describe, assert, it } from "vitest";
import { readCSVToType } from "../pkg/csv";
import { z } from "zod";

describe('readCSVToType', () => {
    it('should read a CSV string into an array of objects', async () => {
        const result = await readCSVToType("a,b,c\n1,2,3", z.object({
            a: z.coerce.number(),
            b: z.coerce.number(),
            c: z.coerce.number(),
        }));

        console.log(result);

        assert(result[0].a === 1);
        assert(result[0].b === 2);
        assert(result[0].c === 3);
    })
})
