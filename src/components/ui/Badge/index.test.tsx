import { act, render, screen } from "@testing-library/react";

import { Badge } from "./index";
import { describe, expect, it } from "vitest";
import styles from "./index.module.css";

describe("Badge", () => {
  it("Check common case", () => {
    act(() => {
      render(
        <Badge
          icon="list"
          active={true}
          badgeColor="var(--primary-color)"
          text="Badge text"
          type="account"
          data-testid="badge"
        />
      );
    });

    const component = screen.getByTestId("badge");
    expect(component).toHaveClass(styles.active);
    expect(component).toHaveClass(styles.account);
    expect(component.style.getPropertyValue("--badge-color")).toBe(
      "var(--primary-color)"
    );
  });

  it("Check black case", () => {
    act(() => {
      render(
        <Badge
          icon=""
          active={false}
          badgeColor={-1}
          text="Badge text"
          type="category"
          data-testid="badge"
        />
      );
    });

    const component = screen.getByTestId("badge");
    expect(component).toHaveClass(styles.black);
    expect(component.style.getPropertyValue("--badge-color")).toBe("");
  });
});
