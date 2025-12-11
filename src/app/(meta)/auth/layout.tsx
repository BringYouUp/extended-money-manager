import { NotAuthLayout } from "@layouts/NotAuthLayout";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <NotAuthLayout>{children}</NotAuthLayout>;
}
