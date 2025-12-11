import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Input } from "./index";
import styles from "./index.module.css";

describe("Input component", () => {
	it("Check common case", () => {
		act(() => {
			render(
				<Input
					data-testid="input"
					hidden
					error
					name="test"
					defaultValue="test"
				/>,
			);
		});

		const component: HTMLInputElement = screen.getByTestId("input");
		expect(component.parentElement).toHaveClass(styles.error);
		expect(component.parentElement).toHaveClass(styles.hidden);
		expect(component.defaultValue).toBe("test");
	});
});
