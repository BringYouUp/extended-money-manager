import { signInWithProvider } from "@async-actions";
import { Button, Icon, Spinner } from "@components";
import { useAppDispatch, useLoading } from "@hooks";

export const ProviderButtons: React.FC = () => {
  const dispatch = useAppDispatch();

  const { isLoading, startLoading, endLoading, loadingData } =
    useLoading(false);

  const onSignInWithProvider = (provider: "google" | "github") => {
    startLoading({ provider });
    dispatch(signInWithProvider({ provider })).finally(() => endLoading());
  };

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
          <Spinner size={16} />
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
          <Spinner size={16} />
        ) : (
          <Icon name="github" size={16} />
        )}
        Continue with Github
      </Button>
    </>
  );
};
