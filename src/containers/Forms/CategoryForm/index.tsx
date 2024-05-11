import { categoriesAddCategory, categoriesEditCategory } from "@async-actions";
import {
  Button,
  ColorPicker,
  Flex,
  FormGroup,
  Icon,
  Input,
  Label,
  Offset,
  Select,
  SelectOption,
  Spinner,
  Text,
  Unwrap,
} from "@components";
import { CATEGORIES_ICONS } from "@consts";
import {
  useAppDispatch,
  useForm,
  useForceUpdate,
  useLoading,
  useUID,
  useToast,
} from "@hooks";
import {
  CategoryFormFormFields,
  FormFields,
  StoreAccountsAccountCurrencies,
  StoreCategoriesCategory,
  StoreCategoriesCategoryTypes,
  StoreCategoryIcon,
} from "@models";
import { ChangeEvent } from "react";
import { PLATFORM_CURRENCIES_LIST } from "src/consts/store";
import { useStoreErrorObserver } from "src/hooks/useStoreErrorObserver";

type Props = (
  | {
      mode: "edit";
      data: StoreCategoriesCategory;
    }
  | {
      mode: "create";
      data?: unknown;
    }
) & {
  onClose: (...args: unknown[]) => void;
  setValues: (values: CategoryFormFormFields) => void;
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
    onChangeForm,
    onSubmitForm,
    getValues,
    getValue,
    formRef,
    setValue,
  } = useForm<CategoryFormFormFields>(
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
            icon: values["category-icon"] as StoreCategoryIcon,
            type: values["category-type"] as StoreCategoriesCategoryTypes,
            deleted: false,
            currency: values[
              "category-currency"
            ] as StoreAccountsAccountCurrencies,
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
            icon: values["category-icon"] as StoreCategoryIcon,
            id: data.id,
            type: values["category-type"] as StoreCategoriesCategoryTypes,
            deleted: false,
            currency: values[
              "category-currency"
            ] as StoreAccountsAccountCurrencies,
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
            data[0] as ChangeEvent<
              HTMLFormElement & FormFields<CategoryFormFormFields>
            >
          );
        case "onSetIcon":
          return onSetIcon(data[0] as StoreCategoryIcon);
      }
    };

  return (
    <form
      autoComplete="off"
      ref={formRef}
      onChange={actionManager("onChangeForm")}
      onSubmit={onSubmitForm(actionManager("onSuccessSubmit"))}
      className="w100"
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
          <Flex style={{ flex: 1 }} w100 column gap={6}>
            <Label htmlFor="category-type">Type</Label>
            <Select<{
              name: Capitalize<StoreCategoriesCategoryTypes>;
              value: StoreCategoriesCategoryTypes;
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
              onChange={(e) => {
                setValue("category-type", e.value);
              }}
              Component={SelectOption}
              Wrapper={({ children }) => (
                <Flex style={{ width: "264px", padding: "4px 0px" }} column>
                  {children}
                </Flex>
              )}
            />

            <Unwrap
              visible={Boolean(errors["category-type"])}
              negativeOffset="6px"
            >
              <Text size={11} color="var(--text-color-error)">
                {errors["category-type"]}
              </Text>
            </Unwrap>
          </Flex>
        </Flex>

        <Flex w100 column gap={6}>
          <Flex style={{ flex: 1 }} w100 column gap={6}>
            <Label htmlFor="category-currency">Currency</Label>
            <Select<{
              name: StoreAccountsAccountCurrencies;
              value: StoreAccountsAccountCurrencies;
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
              onChange={(e) => {
                setValue("category-currency", e.value);
              }}
              Component={SelectOption}
              Wrapper={({ children }) => (
                <Flex style={{ width: "264px", padding: "4px 0px" }} column>
                  {children}
                </Flex>
              )}
            />

            <Unwrap
              visible={Boolean(errors["category-currency"])}
              negativeOffset="6px"
            >
              <Text size={11} color="var(--text-color-error)">
                {errors["category-currency"]}
              </Text>
            </Unwrap>
          </Flex>
        </Flex>

        <Flex w100 column gap={6}>
          <Label htmlFor="category-color">Color</Label>
          <ColorPicker
            id="category-color"
            name="category-color"
            value={getValue("category-color")}
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
