import { TemplateOptions } from "../types/TemplateOptions";
import { DeepPartial } from "../types/DeepPartial";
import { merge } from "../lib/merge";

export class TemplateString {
  private options: TemplateOptions = {
    caseInsensitive: false,
    replaceEmpty: false,
  };

  constructor(
    private template: string,
    options?: DeepPartial<TemplateOptions>
  ) {
    if (options != null) this.options = merge(this.options, options);
  }

  public update(template: string) {
    this.template = template;
    return this;
  }

  public render() {}

  public compile() {}
}
