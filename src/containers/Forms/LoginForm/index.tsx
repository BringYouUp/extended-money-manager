import {
  userResetPassword,
  userSignInWithEmailAndPassword,
} from "@async-actions";
import {
  Button,
  Flex,
  Form,
  Input,
  ProviderButtons,
  Spinner,
  Text,
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
    navigate(`${PATHS.AUTH}${PATHS.SIGN_UP}`);
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

  return (
    <form
      autoComplete="off"
      ref={formRef}
      onSubmit={onSubmitForm(actionManager("onSuccessSubmit"))}
      className="w100"
      onChange={onChangeForm}
    >
      <Form.Items>
        <Form.Item htmlFor="email" error={errors.email} label="Email">
          <Input
            id="email"
            name="email"
            placeholder="Enter email..."
            error={Boolean(errors.email)}
          />
        </Form.Item>

        <Form.Item
          htmlFor="password"
          error={errors.password}
          label="Password"
          RightLabelComponent={
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
          }
        >
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password..."
            error={Boolean(errors.password)}
          />
        </Form.Item>

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
              type="button"
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
      </Form.Items>
    </form>
  );
};
