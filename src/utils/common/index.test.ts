import { getConvertedValue } from "@utils";
import { describe, expect, test } from "vitest";

describe("getConvertedValue", () => {
  const currencies: Shared.Currencies.Currencies = {
    EUR: 0.9245901699,
    PLN: 3.9450705898,
    RUB: 91.1827028614,
    USD: 1,
    updatedAt: "2024-05-15T18:50:22.290Z",
  };
  test("to $", () => {
    expect(
      getConvertedValue({
        from: "$",
        to: "€",
        value: 12,
        currencies,
      }),
    ).toBe("11.10");
  });
  test("to €", () => {
    expect(
      getConvertedValue({
        from: "€",
        to: "$",
        value: 12,
        currencies,
      }),
    ).toBe("12.98");
  });
});
