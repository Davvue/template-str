/**
 * Extends the TypeScript `Partial<T>` type by applying it recursively to all object keys
 *
 * @template T - The object type to turn into a partial type
 */
/**
 * Recursively applies TypeScript’s `Partial<T>` utility type to all
 * nested object properties.
 *
 * This type makes every property in an object optional, including
 * properties of nested objects, while preserving non-object values.
 *
 * It is used for configuration objects where only a subset
 * of deeply nested options may be provided.
 *
 * @template T - The object type to recursively make partial
 *
 * @example
 * ```ts
 * type Options = {
 *   a: number;
 *   b: {
 *     c: string;
 *     d: boolean;
 *   };
 * };
 *
 * type PartialOptions = DeepPartial<Options>;
 *
 * // Equivalent to:
 * // {
 * //   a?: number;
 * //   b?: {
 * //     c?: string;
 * //     d?: boolean;
 * //   };
 * // }
 * ```
 *
 * @since 1.0.0
 */
export type DeepPartial<T extends object> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
