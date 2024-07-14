import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FormGroup } from "./index";
import styles from "./index.module.css";

describe("FormGroup component", () => {
  it("Check common case", () => {
    act(() => {
      render(
        <FormGroup error={true} data-testid="formGroup">
          <span>Hi there</span>
        </FormGroup>,
      );
    });

    const component = screen.getByTestId("formGroup");
    expect(component).toHaveClass(styles.error);
    expect(component.hasChildNodes()).toBe(true);

    expect(component.childNodes[0].textContent).toBe("Hi there");
  });
});
