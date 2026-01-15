# template-str

A lightweight, type-safe template string utility for JavaScript and TypeScript.

`template-str` lets you define string templates with named placeholders and render them with provided data. It also supports default values, escaping and configuring the behavior if a value is missing.

---

## Features

- **Named placeholders** using `[placeholder]` syntax
- **Case-sensitive** matching (`[Name]` != `[name]`)
- **Type-safe** templates in TypeScript
- Default values
- Escaping for literal brackets (`\[name\]`)
- Configurable behavior for missing placeholders

---

## Installation

```bash
npm install template-str
```

or for yarn

```bash
yarn add template-str
```

## Usage

### Basic usage

To start using template strings, just import the `TemplateString` class
from the `template-str` package and instantiate it with your template.
Then just call `render()` on your instance and provide data for the placeholders.

```typescript
import { TemplateString } from "template-str";

const template = new TemplateString("Hello [name]!");
const result = template.render({ name: "John" });

console.log(result); // "Hello John!"
```

## Case-sensitive matching

Placeholder matching is case-sensitive by design, allowing you to pass different
placeholders with the same semantic meaning, but different replacement values.

```typescript
import { TemplateString } from "template-str";
const template = new TemplateString("Hello [Name] [name]");

template.render({ Name: "Alice", name: "Bob" }); // "Hello Alice Bob"
```

## Default values

Default values allow you to specify fallback values before rendering.
If you don't pass a value for a placeholder at render time,
it'll be replaced with its default value if present

```typescript
import { TemplateString } from "template-str";
const template = new TemplateString("Hello [name]", undefined, {
  name: "Guest",
});

template.render({}); // "Hello Guest"
template.render({ name: "Johnny" }); // "Hello Johnny"
```

The data provided to `render()` always overrides default values.

## Options

### `replaceEmpty`

The `replaceEmpty` option allows you to customize what happens when a placeholder value can't be found.

| Value           | Behavior                                                             |
| --------------- | -------------------------------------------------------------------- |
| false (default) | The placeholder construct isn't replaced at all                      |
| string          | The placeholder construct is replaced with the provided string value |

```typescript
import { TemplateString } from "template-str";

const templateReplaced = new TemplateString("Hello [name]", {
  replaceEmpty: "N/A",
});
templateReplaced.render({}); // "Hello N/A"

const template = new TemplateString("Hello [name]");
template.render({}); // "Hello [name]"
```

## Escaping placeholders

To render a placeholder literal without replacing it, you can escape the template characters with backslashes.

```typescript
import { TemplateString } from "template-str";

const templateReplaced = new TemplateString("Hello \\[name\\] [name]", {
  replaceEmpty: "N/A",
});
templateReplaced.render({ name: "Johnny" }); // "Hello [name] Johnny"
```

## Supported placeholder characters

Placeholders may include

- Lower and uppercase letters (a-z, A-Z)
- Numbers (0-9)
- Dashes and underscores (-, \_)

```typescript
import { TemplateString } from "template-str";

const template = new TemplateString("User [user_id-1] is [status_active]");

template.render({
  "user_id-1": 42,
  status_active: "online",
}); // "User 42 is online"
```

## TypeScript support

`template-str` is fully typed and infers placeholder keys from the template string
for a safer usage in TypeScript

```typescript
import { TemplateString } from "template-str";

const template = new TemplateString("Hello [name] [age]");

// TypeScript infers the expected keys
template.render({
  name: "Alice",
  age: 30,
});

// Type error since "username" is not present in the template string
template.render({
  username: "Alice",
});
```

## Contribution

Issues and pull requests are very welcome.
Feel free to open a discussion in the linked repo, if you have any ideas or questions
