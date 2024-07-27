import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ColorPicker } from "./index";
import styles from "./index.module.css";

describe("ColorPicker component", () => {
  it("Initializes with default value", () => {
    act(() => {
      render(<ColorPicker data-testid="colorPicker" value="120" />);
    });

    const component = screen.getByTestId("colorPicker")
      .firstChild as HTMLInputElement;

    expect(component.value).toBe("120");
  });

  it("Calls onValueChange on value change", () => {
    const onValueChangeMock = vi.fn();
    act(() => {
      render(
        <ColorPicker
          data-testid="colorPicker"
          onValueChange={onValueChangeMock}
        />,
      );
    });

    const component = screen.getByTestId("colorPicker")
      .firstChild as HTMLInputElement;

    fireEvent.change(component, { target: { value: "180" } });

    expect(onValueChangeMock).toHaveBeenCalledWith("180");
  });

  it("Applies error class", () => {
    act(() => {
      render(<ColorPicker data-testid="colorPicker" error={true} />);
    });

    const component = screen.getByTestId("colorPicker");
    expect(component).toHaveClass(styles.error);
  });
});
