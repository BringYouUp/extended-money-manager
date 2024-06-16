import { act, render, screen } from "@testing-library/react";

import { Flex } from "./index";
import { describe, expect, it } from "vitest";
import styles from "./index.module.css";

describe("Flex component", () => {
  it("Check gap", () => {
    act(() => {
      render(<Flex gap={4} data-testid="flex" />);
    });

    const component = screen.getByTestId("flex");
    expect(component).toHaveClass(styles.gap);
  });

  it("Check zero gap", () => {
    act(() => {
      render(<Flex gap={0} data-testid="flex" />);
    });
    const component = screen.getByTestId("flex");

    expect(component).not.toHaveClass(styles.gap);
    expect(component.style.getPropertyValue("--flex-gap")).toBe("");
  });
});
