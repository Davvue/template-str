import { TemplateString } from "../../src";

describe("TemplateString", () => {
  describe("basic rendering", () => {
    it("should replace a single placeholder", () => {
      const tpl = new TemplateString("Hello [name]");
      const result = tpl.render({ name: "John" });

      expect(result).toBe("Hello John");
    });

    it("should replace multiple placeholders", () => {
      const tpl = new TemplateString("Hello [name], you are [age]");
      const result = tpl.render({ name: "John", age: 30 });

      expect(result).toBe("Hello John, you are 30");
    });

    it("should replace multiple occurrences", () => {
      const tpl = new TemplateString("Hello [name] and [name]");
      const result = tpl.render({ name: "John" });

      expect(result).toBe("Hello John and John");
    });
  });

  describe("case sensitivity", () => {
    it("should treat placeholders as case-sensitive", () => {
      const tpl = new TemplateString("Hello [Name]");
      // @ts-expect-error "name" is not a valid entry since the template placeholder is "Name"
      const result = tpl.render({ name: "John" });

      expect(result).toBe("Hello [Name]");
    });

    it("should replace placeholders only when case matches exactly", () => {
      const tpl = new TemplateString("Hello [Name] [name]");
      const result = tpl.render({ Name: "Alice", name: "Bob" });

      expect(result).toBe("Hello Alice Bob");
    });

    it("should not mix values between different cases", () => {
      const tpl = new TemplateString("[USER] vs [user]");
      const result = tpl.render({ USER: "ADMIN", user: "guest" });

      expect(result).toBe("ADMIN vs guest");
    });
  });

  describe("default values", () => {
    it("should use default values when data is not provided", () => {
      const tpl = new TemplateString("Hello [name]", undefined, {
        name: "Default",
      });

      const result = tpl.render({});
      expect(result).toBe("Hello Default");
    });

    it("should override default values with provided data", () => {
      const tpl = new TemplateString("Hello [name]", undefined, {
        name: "Default",
      });

      const result = tpl.render({ name: "John" });
      expect(result).toBe("Hello John");
    });
  });

  describe("replaceEmpty option", () => {
    it("should keep placeholder when replaceEmpty is false (default)", () => {
      const tpl = new TemplateString("Hello [name]");
      const result = tpl.render({});

      expect(result).toBe("Hello [name]");
    });

    it("should replace missing placeholders when replaceEmpty is true", () => {
      const tpl = new TemplateString("Hello [name]", {
        replaceEmpty: "",
      });

      const result = tpl.render({});
      expect(result).toBe("Hello ");
    });

    it("should replace missing placeholders with a custom value", () => {
      const tpl = new TemplateString("Hello [name]", {
        replaceEmpty: "N/A",
      });

      const result = tpl.render({});
      expect(result).toBe("Hello N/A");
    });
  });

  describe("escaping placeholders", () => {
    it("should not replace escaped placeholders", () => {
      const tpl = new TemplateString("Hello \\[name]");
      const result = tpl.render({ name: "John" });

      expect(result).toBe("Hello [name]");
    });

    it("should handle escaped brackets correctly with real placeholders", () => {
      const tpl = new TemplateString("Hello \\[name] and [name]");
      const result = tpl.render({ name: "John" });

      expect(result).toBe("Hello [name] and John");
    });
  });

  describe("placeholder patterns", () => {
    it("should support numbers, dashes, and underscores in placeholders", () => {
      const tpl = new TemplateString("User [user_id-1] is [status_active]");

      const result = tpl.render({
        "user_id-1": 42,
        status_active: "online",
      });

      expect(result).toBe("User 42 is online");
    });

    it("should leave unknown placeholders unchanged", () => {
      const tpl = new TemplateString("Hello [unknown]");
      const result = tpl.render({});

      expect(result).toBe("Hello [unknown]");
    });
  });
});
