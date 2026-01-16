/**
 * An object type whose keys correspond to placeholder names
 * extracted from a template string.
 *
 * The values may be of any type, but will be coerced to their
 * string representation at render time.
 *
 * This type is primarily used to provide strong typing and
 * autocomplete support when supplying values to a [`TemplateString`]{@link TemplateString}.
 *
 * @template T - The template string from which placeholder names
 * are inferred
 *
 * @example
 * ```ts
 * type Values = TemplateValues<"Hello [name], you have [count] messages">;
 *
 * // Equivalent to:
 * // {
 * //   name: unknown;
 * //   count: unknown;
 * // }
 * ```
 *
 * @see TemplateValueKeys
 * @see TemplateString
 * @since 1.0.0
 */
export type TemplateValues<T extends string> = Record<
  TemplateValueKeys<T>,
  unknown
>;

/**
 * Extracts placeholder names from a template string.
 *
 * This utility type recursively scans the string for placeholder
 * patterns of the form `[key]` and produces a union of all extracted
 * keys.
 *
 * The extracted keys are used internally to infer the valid keys
 * for [`TemplateValues`]{@link TemplateValues}.
 *
 * Note that escaped placeholders are still inferred at type-level,
 * even though they are ignored at runtime.
 *
 * @template T - The template string to extract placeholder names from
 *
 * @example
 * ```ts
 * type Keys = TemplateValueKeys<"Hello [name], you have [count] messages">;
 * // "name" | "count"
 * ```
 *
 * @since 1.0.0
 */
export type TemplateValueKeys<T extends string> =
  T extends `${string}[${infer V}]${infer Rest}`
    ? V | TemplateValueKeys<Rest>
    : never;
