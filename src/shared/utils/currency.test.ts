import { describe, expect, test } from "vitest";

import { currency } from "./index";

describe("Currency", async () => {
  const gotRes = await currency.get();
  test("Got res", () => {
    expect(Boolean(gotRes)).toBe(true);
  });
});
