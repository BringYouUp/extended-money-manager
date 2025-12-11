import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./index";
import styles from "./index.module.css";

describe("Button component", () => {
	it("Check common case", () => {
		// biome-ignore lint/suspicious/noEmptyBlockStatements: <_>
		const clickHandler = () => {};
		const mock = vi.fn().mockImplementation(clickHandler);
		act(() => {
			render(
				<Button
					onClick={mock}
					theme="outline"
					_role="error"
					rounded
					data-testid="button"
				/>,
			);
		});

		const component = screen.getByTestId("button");
		expect(component).toHaveClass(styles.outline);
		expect(component).toHaveClass(styles.error);
		expect(component).toHaveClass(styles.rounded);

		component.click();
		expect(mock).toHaveBeenCalledTimes(1);
	});
});
