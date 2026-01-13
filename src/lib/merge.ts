/**
 * Performs a deep merge of multiple objects.
 * The passed objects are considered immutable and a new object is returned.
 *
 * @template T
 * @param {...T} objects - One or more objects to merge. Each object must be structurally compatible with `T`. Partial objects are allowed.
 * @returns {T} - A new object containing the merged properties of all input objects.
 *
 * @example
 * ```ts
 * merge(
 *   { a: 1, nested: { x: 1 }, list: [1] },
 *   { b: 2, nested: { y: 2 }, list: [2] }
 * );
 * // { a: 1, b: 2, nested: { x: 1, y: 2 }, list: [1, 2] }
 * ```
 */
export function merge<T extends Record<PropertyKey, unknown>>(
  ...objects: T[]
): T {
  const isPlainObject = (
    value: unknown
  ): value is Record<PropertyKey, unknown> =>
    typeof value === "object" && value !== null && !Array.isArray(value);
  const isArray = <A>(arr: unknown): arr is Array<A> => Array.isArray(arr);

  return objects.reduce<T>((result, current) => {
    const target = result as Record<PropertyKey, unknown>;

    for (const key of Object.keys(current)) {
      const prevVal = result[key];
      const nextVal = current[key];

      if (nextVal === undefined) continue;

      if (isArray(prevVal) && isArray(nextVal)) {
        target[key] = [...prevVal, ...nextVal] as T[keyof T];
      } else if (isPlainObject(prevVal) && isPlainObject(nextVal)) {
        target[key] = merge(prevVal, nextVal);
      } else {
        target[key] = nextVal;
      }
    }

    return result;
  }, {} as T);
}
