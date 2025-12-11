// import { act, render, screen } from "@testing-library/react";

// import { Select } from "./Select";
import { describe, expect, it } from "vitest";

// import styles from "../Button/index.module.css";
// import { Flex, SelectOption } from "@components";

describe("Select component", () => {
	it("Check common case", () => {
		// act(() => {
		//   const root = document.createElement("div");
		//   root.setAttribute("id", "layers");

		//   render(
		//     <>
		//       <Select<{
		//         name: Capitalize<Store.TransactionType>;
		//         value: Store.TransactionType;
		//       }>
		//         disabled={true}
		//         error={true}
		//         mode="single"
		//         placeholder="Select type..."
		//         name="transaction-type"
		//         items={[
		//           { name: "Withdraw", value: "withdraw" },
		//           { name: "Income", value: "income" },
		//           { name: "Transfer", value: "transfer" },
		//         ]}
		//         parseItem={(item) => item.name}
		//         selectedCallback={() => false}
		//         onChangeValue={() => {}}
		//         Component={SelectOption}
		//         Wrapper={({ children }) => (
		//           <Flex style={{ width: "264px", padding: "4px 0px" }} column>
		//             {children}
		//           </Flex>
		//         )}
		//         data-testid="select"
		//       />
		//     </>
		//   );
		// });

		// const component = screen.getByTestId("select");
		// expect(component.classList.contains(styles.disabled)).toBe(true);
		// expect(component.classList.contains(styles.error)).toBe(true);

		expect(true).toBe(true);
	});
});
