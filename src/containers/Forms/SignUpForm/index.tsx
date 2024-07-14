import { userSignUpWithEmailAndPassword } from "@async-actions";
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

export const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useStoreErrorObserver("user");

  const { errors, onSubmitForm, onChangeForm, getValues, formRef } =
    useForm<Components.Form.SignUpIn>({ email: "", password: "" });

  const { isLoading, startLoading, endLoading, loadingData } =
    useLoading(false);

  const onSuccessSubmit = () => {
    if (isLoading) return;

    const { email, password } = getValues();
    startLoading({ submitting: true });

    dispatch(userSignUpWithEmailAndPassword({ email, password })).finally(() =>
      endLoading()
    );
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
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password..."
            error={Boolean(errors.password)}
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
