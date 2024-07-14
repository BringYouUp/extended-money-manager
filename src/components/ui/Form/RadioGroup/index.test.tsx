import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PropsData, RadioGroup } from "./index";
import styles from "./index.module.css";

describe("RadioGroup component", () => {
  it("Check common case", () => {
    const data: PropsData[] = [
      { label: "Option 1", value: "1" },
      { label: "Option 2", value: "2" },
      { label: "Option 3", value: "3" },
    ];

    act(() => {
      render(
        <RadioGroup data={data} hidden name="test" data-testid="radioGroup" />,
      );
    });

    const component = screen.getByTestId("radioGroup");
    const inputs = screen.getAllByRole("radio");

    expect(component).toHaveClass(styles.hidden);
    expect(component.hasChildNodes()).toBe(true);
    expect(inputs).toHaveLength(data.length);
  });
});
