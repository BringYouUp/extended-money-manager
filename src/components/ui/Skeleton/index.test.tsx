import { act, render, screen } from "@testing-library/react";

import { Skeleton } from "./index";
import { describe, expect, it } from "vitest";
import styles from "./index.module.css";

describe("Skeleton component", () => {
  it("Check common case", () => {
    act(() => {
      render(<Skeleton data-testid="skeleton" className="test" />);
    });

    const component = screen.getByTestId("skeleton");

    expect(component).toHaveClass(styles.skeleton);
    expect(component).toHaveClass("test");
  });
});
