import { categoriesAddCategory, categoriesEditCategory } from "@async-actions";
import {
  Button,
  ColorPicker,
  Flex,
  FormGroup,
  Icon,
  Input,
  Label,
  Spinner,
  Text,
  Unwrap,
} from "@components";
import { CATEGORIES_ICONS } from "@consts";
import {
  useAppDispatch,
  useAppSelector,
  useForm,
  useForceUpdate,
  useLoading,
  useUID,
} from "@hooks";
import {
  FormFields,
  StoreCategoriesCategory,
  StoreCategoryIcon,
  UseFormValues,
} from "@models";
import { ChangeEvent } from "react";

type UseFormFields = "category-name" | "category-icon" | "category-color";

type Props = (
  | {
      mode: "edit";
      data: StoreCategoriesCategory;
    }
  | {
      mode: "create";
      data?: never;
    }
) & {
  onClose: (...args: unknown[]) => void;
  setValues: (values: UseFormValues<UseFormFields>) => void;
};

export const CategoryForm: React.FC<Props> = ({
  data,
  mode,
  onClose,
  setValues,
}: Props) => {
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) => state.user.error.message);

  const uid = useUID();
  const forceUpdate = useForceUpdate();

  const { isLoading, startLoading, endLoading, loadingData } =
    useLoading(false);

  const {
    errors,
    onChangeForm,
    onSubmitForm,
    getValues,
    getValue,
    formRef,
    setValue,
  } = useForm<UseFormFields>(
    ["category-name", "category-icon", "category-color"],
    {
      updateOnChange: {
        value: true,
        callback: (_, values) => setValues(values),
      },
      defaultValues: {
        "category-color": mode === "edit" ? data?.color : "",
        "category-icon": mode === "edit" ? data?.icon : "",
        "category-name": mode === "edit" ? data?.name : "",
      },
    }
  );
  const onSuccessSubmit = () => {
    const values = getValues();
    startLoading({ submitting: true });

    if (mode === "create") {
      dispatch(
        categoriesAddCategory({
          category: {
            name: values["category-name"],
            color: values["category-color"],
            currency: "$",
            icon: values["category-icon"] as StoreCategoryIcon,
          },
          uid,
        })
      )
        .then(() => onClose())
        .finally(() => endLoading());
    }

    if (mode === "edit") {
      dispatch(
        categoriesEditCategory({
          category: {
            name: values["category-name"],
            color: values["category-color"],
            icon: values["category-icon"] as StoreCategoryIcon,
            id: data?.id,
          },
          uid,
        })
      )
        .then(() => onClose())
        .finally(() => endLoading());
    }
  };

  const onSetIcon = (icon: StoreCategoryIcon) => {
    setValue("category-icon", icon);
    forceUpdate();
  };

  const actionManager =
    (type: string) =>
    (...data: unknown[]) => {
      if (isLoading) return;
      switch (type) {
        case "onSuccessSubmit":
          return onSuccessSubmit();
        case "onChangeForm":
          return onChangeForm(
            data[0] as ChangeEvent<HTMLFormElement & FormFields<UseFormFields>>
          );
        case "onSetIcon":
          return onSetIcon(data[0] as StoreCategoryIcon);
      }
    };

  return (
    <form
      ref={formRef}
      onChange={actionManager("onChangeForm")}
      onSubmit={onSubmitForm(actionManager("onSuccessSubmit"))}
      className="full-w"
    >
      <Flex w100 column gap={20}>
        <Flex w100 column gap={6}>
          <Label htmlFor="category-name">Category name</Label>
          <Input
            error={Boolean(errors["category-name"])}
            id="category-name"
            name="category-name"
            placeholder="Enter category name..."
          />
          <Unwrap
            visible={Boolean(errors["category-name"])}
            negativeOffset="6px"
          >
            <Text size={11} color="var(--text-color-error)">
              {errors["category-name"]}
            </Text>
          </Unwrap>
        </Flex>

        <Flex w100 column gap={6}>
          <Label htmlFor="category-color">Color</Label>
          <ColorPicker
            id="category-color"
            name="category-color"
            value={mode === "edit" ? data?.color : ""}
          />
          <Unwrap
            visible={Boolean(errors["category-color"])}
            negativeOffset="6px"
          >
            <Text size={11} color="var(--text-color-error)">
              {errors["category-color"]}
            </Text>
          </Unwrap>
        </Flex>

        <Flex w100 column gap={6}>
          <Label htmlFor="category-color">Icon</Label>
          <Input hidden id="category-icon" name="category-icon" />
          <FormGroup error={Boolean(errors["category-icon"])}>
            <Flex gap={6} wrap>
              {CATEGORIES_ICONS.map((icon) => {
                const isIconActive = formRef.current
                  ? getValue("category-icon") === icon
                  : (mode === "edit" ? data?.icon : "") === icon;

                return (
                  <Button
                    key={icon}
                    type="button"
                    active={isIconActive}
                    theme="transparent"
                    rounded
                    onClick={() => actionManager("onSetIcon")(icon)}
                  >
                    <Icon name={icon} size={16} fill="var(--text-color-80)" />
                  </Button>
                );
              })}
            </Flex>
          </FormGroup>
          <Unwrap
            visible={Boolean(errors["category-icon"])}
            negativeOffset="6px"
          >
            <Text size={11} color="var(--text-color-error)">
              {errors["category-icon"]}
            </Text>
          </Unwrap>
        </Flex>

        <Flex column gap={8}>
          <Unwrap visible={Boolean(message)} negativeOffset="6px">
            <Text size={11} color="var(--text-color-error)">
              {message}
            </Text>
          </Unwrap>
          <Flex column gap={12}>
            <Button type="submit" theme="primary" disabled={isLoading}>
              {isLoading && loadingData.current?.submitting && (
                <Spinner size={16} />
              )}
              <Text uppercase>{mode === "create" ? "Create" : "Update"}</Text>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </form>
  );
};
