import { PATHS } from "@consts/paths";
import { ProviderButtons } from "@entities/ProviderButtons";

import { useForm } from "@hooks/useForm";
import { Button, Flex, Input, Spinner, Text } from "@ui";

import { Form } from "@entities/Form";
import { useAuthActions } from "@hooks/useAuthActions";
import { useNavigate } from "react-router-dom";

export const SignUpForm: React.FC = () => {
  const navigate = useNavigate();

  const { onSignUp, isLoading, loadingData } = useAuthActions();

  const { errors, onSubmitForm, onChangeForm, getValues, formRef } =
    useForm<Components.Form.SignUpIn>({ email: "", password: "" });

  const onSuccessSubmit = () => {
    const { email, password } = getValues();
    onSignUp(email, password);
  };

  const onNavigateToLogin = () => {
    navigate(`${PATHS.AUTH}${PATHS.LOGIN}`);
  };

  const actionManager = (type: string) => () => {
    if (isLoading) return;

    switch (type) {
      case "onSuccessSubmit":
        return onSuccessSubmit();
      case "onNavigateToLogin":
        return onNavigateToLogin();
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
        <Form.Item htmlFor="email" label="Email" error={errors.email}>
          <Input
            id="email"
            name="email"
            placeholder="Enter email..."
            error={Boolean(errors.email)}
          />
        </Form.Item>

        <Form.Item htmlFor="password" label="Password" error={errors.password}>
          <Input.Password
            id="password"
            name="password"
            error={Boolean(errors["password"])}
          />
        </Form.Item>

        <Flex column gap={12}>
          <Button type="submit" theme="primary" disabled={isLoading}>
            {isLoading && loadingData.current?.submitting && (
              <Spinner size={16} />
            )}
            <Text uppercase>Register</Text>
          </Button>
          <Button
            onClick={actionManager("onNavigateToLogin")}
            theme="outline"
            disabled={isLoading}
            type="button"
          >
            <Text uppercase>Have an account?</Text>
          </Button>
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
