import { useAuthActions } from "@hooks/useAuthActions";
import { Button, Icon, Spinner } from "@ui";

export const ProviderButtons: React.FC = () => {
	const { onSignInWithProvider, isLoading, loadingData } = useAuthActions();

	const actionManager = (type: string) => () => {
		if (isLoading) return;
		switch (type) {
			case "onSignInWithGoogle":
				return onSignInWithProvider("google");
			case "onSignInWithGithub":
				return onSignInWithProvider("github");
		}
	};

	return (
		<>
			<Button
				theme="outline"
				type="button"
				onClick={actionManager("onSignInWithGoogle")}
				disabled={isLoading}
			>
				{isLoading && loadingData.current?.provider === "google" ? (
					<Spinner />
				) : (
					<Icon name="google" size={16} />
				)}
				Continue with Google
			</Button>
			<Button
				theme="outline"
				type="button"
				onClick={actionManager("onSignInWithGithub")}
				disabled={isLoading}
			>
				{isLoading && loadingData.current?.provider === "github" ? (
					<Spinner />
				) : (
					<Icon name="github" size={16} />
				)}
				Continue with Github
			</Button>
		</>
	);
};
