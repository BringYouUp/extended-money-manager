import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Container } from "./index";
import styles from "./index.module.css";

describe("Container component", () => {
  it("Check common case", () => {
    act(() => {
      render(
        <Container
          data-testid="container"
          width="300px"
          h100
          background="red"
        />
      );
    });

    const component: HTMLDivElement = screen.getByTestId("container");

    expect(component).toHaveClass(styles.width);
    expect(component).toHaveClass(styles.background);
    expect(component).toHaveClass("h100");

    expect(component.style.getPropertyValue("--container-width")).toBe("300px");
    expect(component.style.getPropertyValue("--container-background")).toBe(
      "red"
    );
  });
});
