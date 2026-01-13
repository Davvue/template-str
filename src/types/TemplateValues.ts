export type TemplateValues<T extends string> = Record<
  TemplateValueKeys<T>,
  unknown
>;

export type TemplateValueKeys<T extends string> =
  T extends `${string}[${infer V}]${infer Rest}`
    ? V | TemplateValueKeys<Rest>
    : never;
