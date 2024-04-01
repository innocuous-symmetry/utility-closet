export function must<T = unknown>(
    evaluation: T,
    errorMessage = "Failed to fulfill requirements for function"
): NonNullable<T> | never {
    if (!evaluation) throw new Error(errorMessage);
    return evaluation;
}
