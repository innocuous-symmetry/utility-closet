import { z } from "zod";

export type AssertUniqueType<T extends Record<string, unknown>> = z.ZodEffects<z.ZodArray<z.ZodType<T>>, T[], unknown>;

export function generateUniqueValidator<T extends Record<string, unknown>>(validator: z.ZodType<T>, ...keys: (keyof T)[]) {
    return validator.array().refine((val) => {
        for (const key of keys ?? []) {
            const values = val.map((item) => item[key as keyof T]);
            return values.length === new Set(values).size;
        }
    }, {
        message: "Encountered duplicate values in unique field"
    }) satisfies AssertUniqueType<T>;
}

export function assertUniqueKeys<T extends Record<string, unknown>>(data: T[], validator: z.ZodType<T>, ...keys: (keyof T)[]) {
    return generateUniqueValidator(validator, ...keys).parse(data) satisfies T[];
}

export async function assertUniqueKeysAsync<T extends Record<string, unknown>>(data: T[], validator: z.ZodType<T>, ...keys: (keyof T)[]) {
    return generateUniqueValidator(validator, ...keys).parseAsync(data) satisfies Promise<T[]>;
}
