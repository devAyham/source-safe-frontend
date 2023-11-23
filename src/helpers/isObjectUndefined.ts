export const isObjectUndefined = (obj: Record<string, any>): boolean => {
    return Object.values(obj).every(value => value === undefined);
};
