export function flattenArray<T extends any, S extends Array<any>>(
  arr: S
): T[] {
  let flattened: T[] = [];

  arr.forEach((item) => {
    if (Array.isArray(item)) {
      flattened = flattened.concat(flattenArray(item));
    } else {
      flattened.push(item);
    }
  });

  return flattened;
}
