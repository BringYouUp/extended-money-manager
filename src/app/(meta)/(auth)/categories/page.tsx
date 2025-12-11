import { Metadata } from "next";
import { ClientPage } from "./client";

export const metadata: Metadata = {
	title: `Categories | ${process.env.NEXT_PUBLIC_APP_NAME}`,
};

export default function Page() {
	return <ClientPage />;
}
