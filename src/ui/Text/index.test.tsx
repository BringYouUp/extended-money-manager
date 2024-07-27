import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Text } from "./index";

describe("Unwrap component", () => {
  it("Check correct HTML element", () => {
    act(() => {
      render(<Text as="h2" data-testid="text" />);
    });

    const component: HTMLDivElement = screen.getByTestId("text");
    expect(component.tagName).toBe("H2");
  });

  it("Check some styles", () => {
    act(() => {
      render(
        <Text as="h2" data-testid="text" size={20} color="red" weight={700}>
          Styled Text
        </Text>,
      );
    });
    const component: HTMLDivElement = screen.getByTestId("text");
    expect(component.style.getPropertyValue("--text-size")).toBe("20px");
    expect(component.style.getPropertyValue("--text-color")).toBe("red");
    expect(component.style.getPropertyValue("--text-weight")).toBe("700");
  });
  it("Check onClick prop", () => {
    const handleClick = vi.fn();
    act(() => {
      render(
        <Text as="h2" data-testid="text" clickable onClick={handleClick}>
          Styled Text
        </Text>,
      );
    });
    const component: HTMLDivElement = screen.getByTestId("text");
    fireEvent.click(component);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
