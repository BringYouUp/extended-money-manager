import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useNavigate = () => {
	const router = useRouter();

	const navigate = useCallback(
		// biome-ignore lint/suspicious/noExplicitAny: <_>
		(page: any) => {
			router.push(page);
		},
		[router.push],
	);

	return navigate;
};
