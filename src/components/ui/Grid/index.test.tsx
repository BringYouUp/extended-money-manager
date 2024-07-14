import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Item, Wrap } from "./index";

describe("Grid.Wrap component", () => {
  it("Check common case", () => {
    act(() => {
      render(
        <Wrap
          data-testid="grid-wrap"
          gap={8}
          templateAreas={"test test-2"}
          templateColumns="repeat(auto-fit, minmax(var(--transaction-list-width), 1fr)"
          templateRows="1fr 1fr"
          area="test-area"
        />,
      );
    });

    const component: HTMLDivElement = screen.getByTestId("grid-wrap");

    expect(component.style.getPropertyValue("--grid-gap")).toBe("8px");
    expect(component.style.getPropertyValue("--grid-template-areas")).toBe(
      "test test-2",
    );
    expect(component.style.getPropertyValue("--grid-template-columns")).toBe(
      "repeat(auto-fit, minmax(var(--transaction-list-width), 1fr)",
    );
    expect(component.style.getPropertyValue("--grid-template-rows")).toBe(
      "1fr 1fr",
    );
    expect(component.style.getPropertyValue("--grid-area")).toBe("test-area");
  });
});

describe("Grid.Item component", () => {
  it("Check common case", () => {
    act(() => {
      render(<Item data-testid="grid-item" gap={8} area="test-area" />);
    });

    const component: HTMLDivElement = screen.getByTestId("grid-item");

    expect(component.style.getPropertyValue("--grid-item-gap")).toBe("8px");
    expect(component.style.getPropertyValue("--grid-item-area")).toBe(
      "test-area",
    );
  });
});
