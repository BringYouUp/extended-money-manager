import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SuspenseLoader } from "./index";

describe("Unwrap component", () => {
  it("Check correct HTML element", () => {
    act(() => {
      render(<SuspenseLoader data-testid="suspenseLoader" />);
    });

    const component: HTMLDivElement = screen.getByTestId("suspenseLoader");
    expect(component).toBeInTheDocument();
  });
});
