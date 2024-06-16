import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Scrollable } from "./index";
import styles from "./index.module.css";

describe("Input component", () => {
  it("Check common case", () => {
    act(() => {
      render(
        <Scrollable overlay stableGutter data-testid="scrollable">
          <span>TEST</span>
        </Scrollable>
      );
    });

    const component: HTMLDivElement = screen.getByTestId("scrollable");
    expect(component).toHaveClass(styles.stableGutter);
    expect(component).toHaveClass(styles.overlay);
  });
});
