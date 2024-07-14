import { describe, expect, test } from "vitest";

import { cn } from "./index";

describe("cn", () => {
  test("empty", () => {
    expect(cn()).toBe("");
  });
  test("only string", () => {
    expect(cn("class")).toBe("class");
  });
  test("with true statement", () => {
    expect(cn("class", { class2: true })).toBe("class class2");
  });
  test("with false and true statement", () => {
    expect(cn("class", { class2: false, class3: true })).toBe("class class3");
  });
});
