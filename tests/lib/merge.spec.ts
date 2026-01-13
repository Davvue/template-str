import { merge } from "../../src/lib/merge";

describe("Merge", () => {
  it("should merge flat objects", () => {
    type Obj = {
      foo?: number;
      bar?: number;
    };

    const a: Obj = { foo: 1 };
    const b: Obj = { bar: 2 };

    const result = merge(a, b);

    expect(result).toEqual({ foo: 1, bar: 2 });
  });

  it("should overwrite primitive values from later objects", () => {
    type Obj = {
      foo: number;
    };

    const a: Obj = { foo: 1 };
    const b: Obj = { foo: 2 };

    const result = merge(a, b);

    expect(result).toEqual({ foo: 2 });
  });

  it("should deeply merge nested plain objects", () => {
    type Obj = {
      nested?: {
        foo?: number;
        bar?: number;
        baz?: number;
      };
    };

    const a: Obj = {
      nested: {
        foo: 1,
        bar: 2,
      },
    };

    const b: Obj = {
      nested: {
        bar: 3,
        baz: 4,
      },
    };

    const result = merge(a, b);

    expect(result).toEqual({
      nested: {
        foo: 1,
        bar: 3,
        baz: 4,
      },
    });
  });

  it("should concatenate arrays when both values are arrays", () => {
    type Obj = {
      items?: number[];
    };

    const a: Obj = { items: [1, 2] };
    const b: Obj = { items: [3, 4] };

    const result = merge(a, b);

    expect(result).toEqual({
      items: [1, 2, 3, 4],
    });
  });

  it("should replace values when types do not match", () => {
    type Obj = {
      items?: string | number[];
    };

    const a: Obj = { items: "not-an-array" };
    const b: Obj = { items: [1, 2] };

    const result = merge(a, b);

    expect(result).toEqual({
      items: [1, 2],
    });
  });

  it("should skip keys with undefined values in later objects", () => {
    type Obj = {
      foo?: number;
      bar?: number;
    };

    const a: Obj = { foo: 1, bar: 2 };
    const b: Obj = { foo: undefined };

    const result = merge(a, b);

    expect(result).toEqual({
      foo: 1,
      bar: 2,
    });
  });

  it("should handle multiple objects in sequence", () => {
    type Obj = {
      foo?: number;
      bar?: number;
    };

    const a: Obj = { foo: 1 };
    const b: Obj = { bar: 2 };
    const c: Obj = { foo: 3 };

    const result = merge(a, b, c);

    expect(result).toEqual({
      foo: 3,
      bar: 2,
    });
  });

  it("should not mutate source objects", () => {
    type Obj = {
      nested?: {
        foo?: number;
        bar?: number;
      };
      arr?: number[];
    };

    const a: Obj = { nested: { foo: 1 }, arr: [1] };
    const b: Obj = { nested: { bar: 2 }, arr: [2] };

    const result = merge(a, b);

    expect(a).toEqual({ nested: { foo: 1 }, arr: [1] });
    expect(b).toEqual({ nested: { bar: 2 }, arr: [2] });
    expect(result).toEqual({
      nested: { foo: 1, bar: 2 },
      arr: [1, 2],
    });
  });

  it("should return a new object reference", () => {
    type Obj = {
      foo?: number;
      bar?: number;
    };

    const a: Obj = { foo: 1 };
    const b: Obj = { bar: 2 };

    const result = merge(a, b);

    expect(result).not.toBe(a);
    expect(result).not.toBe(b);
  });

  it("should handle empty input objects", () => {
    type Obj = {
      foo?: number;
    };

    const result = merge<Obj>({}, { foo: 1 });

    expect(result).toEqual({ foo: 1 });
  });
});
