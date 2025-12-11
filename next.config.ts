import type { NextConfig } from "next";

import packageJSON from "./package.json";

const date = new Date();
const formatter = new Intl.DateTimeFormat("en-US", {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
});
const formattedDate = formatter.format(date);

const nextConfig: NextConfig = {
	output: "export",
	distDir: "dist",
	basePath: process.env.NEXT_PUBLIC_BASE_PATH,
	compiler: {
		define: {
			__LAST_BUILD_AT__: JSON.stringify(formattedDate),
			__APP_VERSION__: JSON.stringify(packageJSON.version),
		},
	},
};

export default nextConfig;
