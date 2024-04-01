export async function promiseAllOptimistic<T>(tasks: Promise<T>[]) {
    return await Promise.allSettled(tasks)
        .then(res => {
            const fulfilled: NonNullable<T>[] = [];

            res.forEach(r => {
                if (r.status == 'fulfilled' && r.value) {
                    fulfilled.push(r.value);
                }
            });

            return fulfilled;
        }) satisfies Awaited<NonNullable<T>[]>;
}
