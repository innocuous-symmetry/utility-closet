import { Options, parse, Parser } from "csv-parse";
import { z } from "zod";

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

    for await (const record of parser as (Parser & AsyncIterable<never>)) {
        records.push(
            validator.parse(record)
        )
    }

    return records;
}
