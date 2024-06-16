import { act, render, screen } from "@testing-library/react";

import { SelectOption } from "./SelectOption";
import { describe, expect, it } from "vitest";

import styles from "../Button/index.module.css";

const data = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

describe("SelectOption component", () => {
  it("Check common case", () => {
    act(() => {
      render(
        <SelectOption
          key="test"
          selected={true}
          parseItem={(z) => <div>{z.id}</div>}
          data={data[0]}
          data-testid="select-option"
        />
      );
    });

    const component = screen.getByTestId("select-option");
    expect(component.classList.contains(styles.active)).toBe(true);
  });
});
