import { TemplateOptions } from "../types/TemplateOptions";
import { DeepPartial } from "../types/DeepPartial";
import { merge } from "../lib/merge";
import { TemplateValues } from "../types/TemplateValues";

export class TemplateString<T extends string> {
  private defaultValues: Partial<TemplateValues<T>> = {};
  private options: TemplateOptions = {
    replaceEmpty: false,
  };

  constructor(
    private template: T,
    options?: DeepPartial<TemplateOptions>,
    defaultValues: Partial<TemplateValues<T>> = {}
  ) {
    if (options != null)
      this.options = merge(this.options, options) as TemplateOptions;
    this.defaultValues = defaultValues;
  }

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

  public render(data: Partial<TemplateValues<T>>): string {
    const re = /(?<!\\)\[([a-zA-Z0-9\-_]+)(?<!\\)\]/gm;
    const replacerFn = this.replacer({ ...this.defaultValues, ...data });
    let result = this.template.replace(re, replacerFn);
    result = result.replace(/\\\[/gm, "[").replace(/\\\]/gm, "]");
    return result;
  }

  public compile() {}
}
