import { act, render, screen } from "@testing-library/react";

import { Spinner } from "./index";
import { describe, expect, it } from "vitest";

describe("Spinner component", () => {
  it("Check common case", () => {
    act(() => {
      render(
        <Spinner data-testid="spinner" size={24} color="var(--primary-color)" />
      );
    });

    const component = screen.getByTestId("spinner");

    expect(component).toHaveStyle({
      "--spinner-size": "24px",
      "--spinner-color": "var(--primary-color)",
    });
  });
});
