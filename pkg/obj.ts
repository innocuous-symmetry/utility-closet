/**
 * Given an object, return a copy of the object with the specified properties removed.
 *
 * @param obj - the object to strip properties from
 * @param keys - the properties to remove from the object
 * @returns - the new object with the specified properties removed
 */
export function excludeFromObject<
    TObj extends Record<string, unknown>
>(
    obj: TObj,
    ...keys: (keyof TObj)[]
) {
    const copy = { ...obj }

    for (const key of keys) {
        delete copy[key];
    }

    return copy satisfies Omit<TObj, typeof keys[number]>;
}

/** The functional opposite of `excludeFromObject` */
export function pickFromObject<
    TObj extends Record<string, unknown>
>(
    obj: TObj,
    ...keys: (keyof TObj)[]
) {
    const copy = {} as Pick<TObj, keyof TObj>;

    for (const key of keys) {
        copy[key] = obj[key];
    }

    return copy;
}

export function hasAllKeys<
    TObj extends Record<string, unknown>
>(obj: TObj, ...keys: (keyof TObj)[]) {
    for (const key of keys) {
        if (!obj[key]) return false;
    }

    return true;
}

export default class Obj {
    static exclude = excludeFromObject;
    static pick = pickFromObject;
    static hasAllKeys = hasAllKeys;
}
