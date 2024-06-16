import { act, render, screen } from "@testing-library/react";

import { Label } from "./index";
import { describe, expect, it } from "vitest";
import styles from "./index.module.css";

describe("Label component", () => {
  it("Check common case", () => {
    act(() => {
      render(
        <Label htmlFor="debug" data-testid="label">
          <span>Hi there</span>
        </Label>
      );
    });

    const component = screen.getByTestId("label");
    expect(component).toHaveClass(styles.label);
    expect(component.hasAttribute("for")).toBe(true);
    expect(component.hasChildNodes()).toBe(true);
    expect(component.childNodes[0].textContent).toBe("Hi there");
  });
});
