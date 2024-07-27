import { PATHS } from "@consts/paths";
import { Form } from "@entities/Form";
import { ProviderButtons } from "@entities/ProviderButtons";

import { useAuthActions } from "@hooks/useAuthActions";
import { useForm } from "@hooks/useForm";
import { Button, Flex, Input, Spinner, Text } from "@ui";
import { useNavigate } from "react-router-dom";

export const LoginForm: React.FC = () => {
  const { onForgotPassword, onSignIn, isLoading, loadingData } =
    useAuthActions();

  const navigate = useNavigate();

  const { errors, onSubmitForm, getValues, onChangeForm, formRef } =
    useForm<Components.Form.SignUpIn>({ email: "", password: "" });

  const onSuccessSubmit = () => {
    const { email, password } = getValues();
    onSignIn(email, password);
  };

  const onNavigateToSignUp = () => {
    navigate(`${PATHS.AUTH}${PATHS.SIGN_UP}`);
  };

  const actionManager = (type: string) => () => {
    if (isLoading) return;
    switch (type) {
      case "onForgotPassword":
        const { email } = getValues();
        return onForgotPassword(email);
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
                Forgot password ?
              </Flex>
            </Text>
          }
        >
          <Input.Password
            id="password"
            name="password"
            error={Boolean(errors["password"])}
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
