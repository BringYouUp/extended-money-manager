import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Unwrap } from "./index";
import styles from "./index.module.css";

describe("Unwrap component", () => {
  it("Check common case", () => {
    act(() => {
      render(<Unwrap data-testid="unwrap" negativeOffset="34px" visible />);
    });

    const component: HTMLDivElement = screen.getByTestId("unwrap");

    expect(component.style.getPropertyValue("--unwrap-negative-offset")).toBe(
      "34px"
    );
    expect(component).toHaveClass(styles.visible);
  });
});
