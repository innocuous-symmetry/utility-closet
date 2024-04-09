import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { assertUniqueKeys } from "../pkg/unique";

describe("assert unique", () => {
    it("should assert unique keys in a homogenous array", () => {
        const data = [
            { id: 1, name: "John" },
            { id: 2, name: "Doe" },
            { id: 3, name: "Jane" },
        ];
        const validator = z.object({
            id: z.number(),
            name: z.string(),
        });

        expect(
            () => assertUniqueKeys(data, validator, "id")
        ).not.toThrow();
    })

    it("should reject arrays violating unique key constraints", () => {
        const data = [
            { id: 1, name: "John" },
            { id: 1, name: "Doe" },
            { id: 1, name: "Jane" },
        ];
        const validator = z.object({
            id: z.number(),
            name: z.string(),
        });

        expect(
            () => assertUniqueKeys(data, validator, "id")
        ).toThrowError("Encountered duplicate values in unique field");
    })

    it("should only allow record types", () => {
        const data = [
            2, 3, 4, 5, "foo", "bar", true
        ];

        const validator = z.union([z.number(), z.string(), z.boolean()]);

        expect(
            // @ts-expect-error
            () => assertUniqueKeys(data, validator)
        ).toThrow();
    })
})
