import {
  userResetPassword,
  userSignInWithEmailAndPassword,
} from "@async-actions";
import {
  Button,
  Flex,
  Input,
  Label,
  ProviderButtons,
  Spinner,
  Text,
  Unwrap,
} from "@components";
import { PATHS } from "@consts";
import { useAppDispatch, useForm, useLoading } from "@hooks";
import { useNavigate } from "react-router-dom";
import { useStoreErrorObserver } from "src/hooks/useStoreErrorObserver";

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useStoreErrorObserver("user");
  const { errors, onSubmitForm, getValues, onChangeForm, formRef } =
    useForm<Components.Form.SignUpIn>({ email: "", password: "" });

  const { isLoading, startLoading, endLoading, loadingData } =
    useLoading(false);

  const onSuccessSubmit = () => {
    if (isLoading) return;

    const { email, password } = getValues();
    startLoading({ submitting: true });

    dispatch(userSignInWithEmailAndPassword({ email, password })).finally(() =>
      endLoading()
    );
  };

  const onForgotPassword = () => {
    startLoading({ forgot: true });

    const { email } = getValues();

    dispatch(userResetPassword({ email })).finally(() => endLoading());
  };

  const onNavigateToSignUp = () => {
    navigate(PATHS.SIGN_UP);
  };

  const actionManager = (type: string) => () => {
    if (isLoading) return;
    switch (type) {
      case "onForgotPassword":
        return onForgotPassword();
      case "onSuccessSubmit":
        return onSuccessSubmit();
      case "onNavigateToSignUp":
        return onNavigateToSignUp();
    }
  };

  console.log(`→ Boolean(errors.email)`, Boolean(errors.email));

  return (
    <form
      autoComplete="off"
      ref={formRef}
      onSubmit={onSubmitForm(actionManager("onSuccessSubmit"))}
      className="w100"
      onChange={onChangeForm}
    >
      <Flex w100 column gap={20}>
        <Flex w100 column gap={6}>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Enter email..."
            error={Boolean(errors.email)}
          />
          <Unwrap visible={Boolean(errors.email)} negativeOffset="6px">
            <Text size={11} color="var(--text-color-error)">
              {errors.email}
            </Text>
          </Unwrap>
        </Flex>
        <Flex w100 column gap={6}>
          <Flex w100 justifyBetween alignCenter>
            <Label htmlFor="password">Password</Label>
            <Text
              size={10}
              color="var(--text-color-60)"
              clickable
              onClick={actionManager("onForgotPassword")}
            >
              <Flex gap={6}>
                {isLoading && loadingData.current?.forgot && (
                  <Spinner size={10} />
                )}
                Forgor password?
              </Flex>
            </Text>
          </Flex>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password..."
            error={Boolean(errors.password)}
          />
          <Unwrap visible={Boolean(errors.password)} negativeOffset="6px">
            <Text size={11} color="var(--text-color-error)">
              {errors.password}
            </Text>
          </Unwrap>
        </Flex>
        <Flex column gap={8}>
          <Flex column gap={12}>
            <Button type="submit" theme="primary" disabled={isLoading}>
              {isLoading && loadingData.current?.submitting && (
                <Spinner size={16} />
              )}
              <Text uppercase>Sign in</Text>
            </Button>
            <Button
              onClick={actionManager("onNavigateToSignUp")}
              theme="outline"
              disabled={isLoading}
            >
              <Text uppercase>No account?</Text>
            </Button>
          </Flex>
        </Flex>
        <Flex column gap={16}>
          <Text as="h3" weight={400} block center uppercase>
            Or
          </Text>
          <Flex center gap={12} column>
            <ProviderButtons />
          </Flex>
        </Flex>
      </Flex>
    </form>
  );
};
