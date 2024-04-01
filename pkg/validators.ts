/**
 * Assert that a given value, @param evaluation, is truthy. @returns the evaluation, asserted as non-nullable.
 */

import { Callable } from "./types";

export function must<T = unknown>(evaluation: T, callback?: Callable<never>): NonNullable<T> | never {
    if (!evaluation) {
        if (!callback) throw new Error("Assertion failed: value is falsy");
        return callback();
    }

    return evaluation;
}
