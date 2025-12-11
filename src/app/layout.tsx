import { Metadata } from "next";
import "../styles/index.css";
import { Providers } from "./Providers";

export const metadata: Metadata = {
	title: `${process.env.NEXT_PUBLIC_APP_NAME}`,
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<Providers>
					<div id="root">{children}</div>
					<div id="layers"></div>
				</Providers>
			</body>
		</html>
	);
}
