import { Form } from "@entities/Form";
import { useAppSelector } from "@hooks/useAppSelector";
import { useAuthActions } from "@hooks/useAuthActions";
import { useForm } from "@hooks/useForm";
import { Button, Flex, Input, Spinner, Text } from "@ui";

export const ChagePasswordForm: React.FC = () => {
  const email = useAppSelector((state) => state.user.user.email);
  const { onForgotPassword, onChangePassword, isLoading, loadingData } =
    useAuthActions();

  const { errors, onSubmitForm, onChangeForm, getValues, formRef } =
    useForm<Components.Form.ChangePassword>({
      password: "",
      "new-password": "",
    });

  const onSuccessSubmit = () => {
    const { "new-password": newPassword, password } = getValues();
    onChangePassword(password, newPassword);
    if (isLoading) return;
  };

  const actionManager =
    (type: "onSuccessSubmit" | "onForgotPassword") => () => {
      if (isLoading) return;

      switch (type) {
        case "onSuccessSubmit":
          return onSuccessSubmit();
        case "onForgotPassword":
          return onForgotPassword(email);
      }
    };

  return (
    <form
      style={{ maxWidth: "300px" }}
      autoComplete="off"
      ref={formRef}
      onSubmit={onSubmitForm(actionManager("onSuccessSubmit"))}
      className="w100"
      onChange={onChangeForm}
    >
      <Form.Items>
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
          <Input.Password
            id="password"
            name="password"
            error={Boolean(errors["password"])}
          />
        </Form.Item>

        <Form.Item
          htmlFor="new-password"
          error={errors["new-password"]}
          label="New password"
        >
          <Input.Password
            id="new-password"
            name="new-password"
            placeholder="Enter new password..."
            error={Boolean(errors["new-password"])}
          />
        </Form.Item>

        <Button type="submit" theme="primary" disabled={isLoading}>
          {isLoading && loadingData.current?.submitting && (
            <Spinner size={16} />
          )}
          <Text uppercase>Change</Text>
        </Button>
      </Form.Items>
    </form>
  );
};
