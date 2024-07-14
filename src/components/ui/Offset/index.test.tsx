import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Offset } from "./index";
import styles from "./index.module.css";

describe("Input component", () => {
  it("Check common case", () => {
    act(() => {
      render(<Offset data-testid="offset" padding={[99]} margin={[99]} />);
    });

    const component: HTMLDivElement = screen.getByTestId("offset");
    expect(component).toHaveClass(styles.padding);
    expect(component).toHaveClass(styles.margin);
  });

  it("Check one p/m value", () => {
    act(() => {
      render(<Offset data-testid="offset" padding={[99]} margin={[99]} />);
    });

    const component: HTMLDivElement = screen.getByTestId("offset");
    expect(component.style.getPropertyValue("--offset-padding")).toBe("99px");
    expect(component.style.getPropertyValue("--offset-margin")).toBe("99px");
  });

  it("Check two p/m value", () => {
    act(() => {
      render(
        <Offset data-testid="offset" padding={[3, 76]} margin={[54, 90]} />,
      );
    });

    const component: HTMLDivElement = screen.getByTestId("offset");
    expect(component.style.getPropertyValue("--offset-padding")).toBe(
      "3px 76px",
    );
    expect(component.style.getPropertyValue("--offset-margin")).toBe(
      "54px 90px",
    );
  });

  it("Check three p/m value", () => {
    act(() => {
      render(
        <Offset data-testid="offset" padding={[1, 2, 3]} margin={[4, 5, 6]} />,
      );
    });

    const component: HTMLDivElement = screen.getByTestId("offset");
    expect(component.style.getPropertyValue("--offset-padding")).toBe(
      "1px 2px 3px",
    );
    expect(component.style.getPropertyValue("--offset-margin")).toBe(
      "4px 5px 6px",
    );
  });

  it("Check four p/m value", () => {
    act(() => {
      render(
        <Offset
          data-testid="offset"
          padding={[1, 2, 3, 4]}
          margin={[5, 6, 7, 8]}
        />,
      );
    });

    const component: HTMLDivElement = screen.getByTestId("offset");
    expect(component.style.getPropertyValue("--offset-padding")).toBe(
      "1px 2px 3px 4px",
    );
    expect(component.style.getPropertyValue("--offset-margin")).toBe(
      "5px 6px 7px 8px",
    );
  });
});
