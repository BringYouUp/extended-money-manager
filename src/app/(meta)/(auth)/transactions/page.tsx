import { Metadata } from "next";
import { ClientPage } from "./client";

export const metadata: Metadata = {
	title: `Transactions | ${process.env.NEXT_PUBLIC_APP_NAME}`,
};

export default function Page() {
	return <ClientPage />;
}
