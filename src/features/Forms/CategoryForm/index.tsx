import {
  categoriesAddCategory,
  categoriesEditCategory,
} from "@async-actions/categories";

import { CATEGORIES_ICONS } from "@consts/categories";
import { PLATFORM_CURRENCIES_LIST } from "@consts/store";
import { Form } from "@entities/Form";

import { useAppDispatch } from "@hooks/useAppDispatch";
import { useForceUpdate } from "@hooks/useForceUpdate";
import { useForm } from "@hooks/useForm";
import { useLoading } from "@hooks/useLoading";
import { useStoreErrorObserver } from "@hooks/useStoreErrorObserver";
import { useToast } from "@hooks/useToast";
import { useUID } from "@hooks/useUID";
import {
  Button,
  ColorPicker,
  Flex,
  FormGroup,
  Icon,
  Input,
  Offset,
  Select,
  SelectOption,
  Spinner,
  Text,
} from "@ui";

type Props = (
  | {
      mode: "edit";
      data: Store.Category;
    }
  | {
      mode: "create";
      data?: unknown;
    }
) & {
  onClose: (...args: unknown[]) => void;
  setValues: (values: Components.Form.Category) => void;
};

export const CategoryForm: React.FC<Props> = ({
  data,
  mode,
  onClose,
  setValues,
}: Props) => {
  const dispatch = useAppDispatch();

  useStoreErrorObserver("categories");
  const uid = useUID();
  const forceUpdate = useForceUpdate();
  const { createToast } = useToast();

  const { isLoading, startLoading, endLoading, loadingData } =
    useLoading(false);

  const {
    errors,
    onSubmitForm,
    getValues,
    onChangeForm,
    getValue,
    formRef,
    setValue,
  } = useForm<Components.Form.Category>(
    {
      "category-color":
        mode === "edit" ? data.color : `${Math.floor(Math.random() * 360)}`,
      "category-icon": mode === "edit" ? data.icon : "",
      "category-name": mode === "edit" ? data.name : "",
      "category-type": mode === "edit" ? data.type : "",
      "category-currency": mode === "edit" ? data.currency : "",
    },
    {
      updateOnChange: (_, values) => setValues(values),
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
            icon: values["category-icon"] as Store.CategoryIcon,
            type: values["category-type"] as Store.CategoryType,
            deleted: false,
            currency: values[
              "category-currency"
            ] as Shared.Currencies.CurrencySymbols,
          },
          uid,
        })
      )
        .then(() => {
          onClose(true);
          createToast("category created", "success");
        })
        .finally(() => endLoading());
    }

    if (mode === "edit") {
      dispatch(
        categoriesEditCategory({
          category: {
            name: values["category-name"],
            color: values["category-color"],
            icon: values["category-icon"] as Store.CategoryIcon,
            id: data.id,
            type: values["category-type"] as Store.CategoryType,
            deleted: false,
            currency: values[
              "category-currency"
            ] as Shared.Currencies.CurrencySymbols,
          },
          uid,
        })
      )
        .then(() => {
          onClose(true);
          createToast("category updated", "success");
        })
        .finally(() => endLoading());
    }
  };

  const onSetIcon = (icon: Store.CategoryIcon) => {
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
        case "onSetIcon":
          return onSetIcon(data[0] as Store.CategoryIcon);
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
        <Form.Item
          error={errors["category-name"]}
          htmlFor="category-name"
          label="Category name"
        >
          <Input
            error={Boolean(errors["category-name"])}
            id="category-name"
            name="category-name"
            placeholder="Enter category name..."
          />
        </Form.Item>

        <Form.Item
          htmlFor="category-type"
          label="Type"
          error={errors["category-type"]}
        >
          <Select<{
            name: Capitalize<Store.CategoryType>;
            value: Store.CategoryType;
          }>
            disabled={mode === "edit"}
            mode="single"
            placeholder="Select type..."
            name="category-type"
            error={Boolean(errors["category-type"])}
            items={[
              { name: "Withdraw", value: "withdraw" },
              { name: "Income", value: "income" },
            ]}
            parseItem={(item) => item.name}
            selectedCallback={(type) =>
              getValue("category-type") === type.value
            }
            onChangeValue={(e) => {
              setValue("category-type", e.value);
            }}
            Component={SelectOption}
            Wrapper={({ children }) => (
              <Flex style={{ width: "264px", padding: "4px 0px" }} column>
                {children}
              </Flex>
            )}
          />
        </Form.Item>

        <Form.Item
          htmlFor="category-currency"
          label="Currency"
          error={errors["category-currency"]}
        >
          <Select<{
            name: Shared.Currencies.CurrencySymbols;
            value: Shared.Currencies.CurrencySymbols;
          }>
            mode="single"
            placeholder="Select currency..."
            name="category-currency"
            error={Boolean(errors["category-currency"])}
            items={PLATFORM_CURRENCIES_LIST}
            parseItem={(item) => item.name}
            selectedCallback={(currency) =>
              getValue("category-currency") === currency.value
            }
            onChangeValue={(e) => {
              setValue("category-currency", e.value);
            }}
            Component={SelectOption}
            Wrapper={({ children }) => (
              <Flex style={{ width: "264px", padding: "4px 0px" }} column>
                {children}
              </Flex>
            )}
          />
        </Form.Item>

        <Form.Item
          htmlFor="category-color"
          label="Color"
          error={errors["category-color"]}
        >
          <ColorPicker
            id="category-color"
            name="category-color"
            value={getValue("category-color")}
          />
        </Form.Item>

        <Form.Item
          htmlFor="category-color"
          label="Icon"
          error={errors["category-icon"]}
        >
          <Input hidden id="category-icon" name="category-icon" />
          <FormGroup error={Boolean(errors["category-icon"])}>
            <Offset w100 padding={[8]}>
              <Flex gap={16} wrap justifyBetween>
                {CATEGORIES_ICONS.map((icon) => {
                  const isIconActive = getValue("category-icon") === icon;

                  return (
                    <Button
                      key={icon}
                      type="button"
                      active={isIconActive}
                      theme="transparent"
                      rounded
                      onClick={() => actionManager("onSetIcon")(icon)}
                    >
                      <Icon name={icon} size={16} />
                    </Button>
                  );
                })}
              </Flex>
            </Offset>
          </FormGroup>
        </Form.Item>

        <Flex column gap={8}>
          <Flex column gap={12}>
            <Button type="submit" theme="primary" disabled={isLoading}>
              {isLoading && loadingData.current?.submitting && (
                <Spinner size={16} />
              )}
              <Text uppercase>{mode === "create" ? "Create" : "Update"}</Text>
            </Button>
          </Flex>
        </Flex>
      </Form.Items>
    </form>
  );
};
