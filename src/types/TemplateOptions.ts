/**
 * Options used to configure the behavior of the [`TemplateString`]{@link TemplateString} class.
 *
 * These options define how a `TemplateString` instance behaves when
 * processing and resolving templates.
 *
 * @see TemplateString
 * @since 1.0.0
 */
export interface TemplateOptions {
  /**
   * Controls how placeholders are handled when no value is available.
   *
   * Behavior:
   * - `false` (default): the placeholder is left unchanged in the output
   * - `string`: the placeholder is replaced with the provided string
   *
   * @example Leaving placeholders intact
   * ```ts
   * new TemplateString("Hello [name]!", { replaceEmpty: false });
   * // "Hello [name]!"
   * ```
   *
   * @example Replacing missing placeholders
   * ```ts
   * new TemplateString("Hello [name]!", { replaceEmpty: "Guest" });
   * // "Hello Guest"
   * ```
   *
   * @default false
   * @type {false | string}
   * @since 1.0.0
   */
  replaceEmpty: false | string;
}
