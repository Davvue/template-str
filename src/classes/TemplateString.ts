import { TemplateOptions } from "../types/TemplateOptions";
import { DeepPartial } from "../types/DeepPartial";
import { merge } from "../lib/merge";
import { TemplateValues } from "../types/TemplateValues";

/**
 * Wraps a string to turn it into a template string.
 *
 * A `TemplateString` allows defining placeholders inside a string using
 * square-bracket syntax (e.g. `[name]`) and replacing them with values
 * provided at render time.
 *
 * Placeholders can be escaped using a backslash (e.g. `\[name\]`) to prevent
 * replacement. While escaping only one bracket works for escaping the whole placeholder,
 * it is strongly recommended to escape both brackets for future safety.
 *
 * Valid placeholder keys are inferred from the string literal
 * passed to the constructor. This inference is used to provide
 * TypeScript type checking and autocomplete for methods accepting template values.
 *
 * **Note:** Escaped placeholders are still inferred at type-level,
 * even though they are ignored at runtime.
 *
 * @template T - A string literal type containing template placeholders. Will be auto-inferred when calling constructor
 *
 * @example Basic usage with no additional configuration or default values.
 * ```ts
 * const tpl = new TemplateString("Hello [name]!");
 * tpl.render({ name: "Alice" }); // "Hello Alice!"
 * ```
 *
 * @example Providing default values for placeholders, if render doesn't provide data
 * ```ts
 * const tpl = new TemplateString(
 *   "Hello [name]!",
 *   undefined,
 *   { name: "Guest" }
 * );
 *
 * tpl.render({}); // "Hello Guest!"
 * ```
 *
 * @since 1.0.0
 * @version 1.0.0
 */
export class TemplateString<T extends string> {
  /**
   * Default values used when a placeholder is not provided
   * in the `render` call.
   *
   * @private
   */
  private defaultValues: Partial<TemplateValues<T>> = {};

  /**
   * Configuration options controlling template rendering behavior.
   *
   * @private
   */
  private options: TemplateOptions = {
    replaceEmpty: false,
  };

  /**
   * Constructs a new `TemplateString` instance.
   *
   * @param {T} template - The string literal to be used as a template
   * @param {DeepPartial<TemplateOptions>} [options] - Optional configuration
   * controlling rendering behavior. See {@link TemplateOptions} for available options and explanation
   * @param {Partial<TemplateValues<T>>} [defaultValues] - Values used as
   * fallbacks when no value is provided for a placeholder during rendering
   *
   * @see TemplateOptions
   */
  constructor(
    private template: T,
    options?: DeepPartial<TemplateOptions>,
    defaultValues?: Partial<TemplateValues<T>>
  ) {
    if (options != null)
      this.options = merge(this.options, options) as TemplateOptions;
    if (defaultValues != null) this.defaultValues = defaultValues;
  }

  /**
   * Creates a replacement function used by `String.prototype.replace`
   * to resolve template placeholders.
   *
   * The returned function:
   * - Replaces placeholders when a matching key exists in `data`
   * - Leaves the placeholder intact or replaces it with a configured
   *   fallback value when no matching key is found
   *
   * @param {Partial<TemplateValues<T>>} data - The combined set of default
   * and render-time values
   * @returns {(match: string, placeholder?: string) => string}
   * A function compatible with `String.prototype.replace`
   *
   * @private
   */
  private replacer(
    data: Partial<TemplateValues<T>>
  ): (match: string, placeholder: string | undefined) => string {
    return (match, placeholder) => {
      if (placeholder == null) return match;
      if (placeholder in data)
        return String(data[placeholder as keyof typeof data]);
      return this.options.replaceEmpty !== false
        ? this.options.replaceEmpty
        : match;
    };
  }

  /**
   * Renders the template by replacing placeholders with the provided values.
   *
   * Default values defined in the constructor are merged with the values
   * provided here, with render-time values taking precedence.
   *
   * Calling `render()` does not mutate the template or default values.
   *
   * Escaped placeholders (e.g. `\[name\]`) are preserved in the output.
   *
   * All substituted values are coerced to strings using `String(value)`.
   *
   * @param {Partial<TemplateValues<T>>} data - Values to substitute into the template
   * @returns {string} The rendered string with placeholders resolved
   * @public
   *
   * @example
   * ```ts
   * const tpl = new TemplateString("Hello [name]!");
   * tpl.render({ name: "World" }); // "Hello World!"
   * ```
   */
  public render(data: Partial<TemplateValues<T>>): string {
    const re = /(?<!\\)\[([a-zA-Z0-9\-_]+)(?<!\\)\]/gm;
    const replacerFn = this.replacer({ ...this.defaultValues, ...data });
    let result = this.template.replace(re, replacerFn);
    result = result.replace(/\\\[/gm, "[").replace(/\\\]/gm, "]");
    return result;
  }

  /**
   * Compiles the template into a reusable rendering function.
   *
   * This method is not yet implemented.
   *
   * @experimental
   * @returns void
   * @public
   */
  public compile() {}
}
