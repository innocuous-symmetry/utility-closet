import { Options, parse, Parser } from "csv-parse";
import { z } from "zod";

/**
 * Converts raw CSV data into a validated array of entries of a given type,
 * specified by a Zod validator provided in the function parameters.
 *
 * @param text a raw CSV text entry containing the data you wish to read
 * @param validator a Zod schema representing the type of the target object
 * @param options optional configuration options for the CSV parser
 * @returns an array of validated
 */
export async function readCSVToType<
    TData extends Record<string, unknown>
>(
    text: string,
    validator: z.ZodType<TData>,
    options?: Options
) {
    options ??= {
        columns: true,
        ignore_last_delimiters: true,
        skip_empty_lines: true,
        relax_column_count: true
    }

    const parser = parse(text, options);
    const records: TData[] = [];

    // the type of the iterable is irrelevant, as it will be asserted by the Zod schema
    for await (const record of parser as (Parser & AsyncIterable<never>)) {
        try {
            records.push(validator.parse(record))
        } catch (e) {
            console.error(e);
        }
    }

    return records;
}
