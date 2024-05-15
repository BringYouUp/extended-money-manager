import {
  Badge,
  Button,
  Container,
  Drawer,
  Flex,
  FormGroup,
  Icon,
  Label,
  Offset,
  Scrollable,
  Text,
  RadioGroup,
  Unwrap,
} from "@components";
import { TRANSACTIONS_TYPES } from "@consts";
import { useAppSelector, useForm, useSearchTransactions } from "@hooks";
import {
  StoreTransactionsTransactionType,
  TransactionsFilterForm,
} from "@models";
import { ACCOUNT_SELECTOR, CATEGORY_SELECTOR } from "@selectors";
import { useEffect } from "react";

import { FilterModel } from "src/models/hooks/useFilterTransactions";

type Props = {
  filter: FilterModel;
  is: boolean;
  onClose: () => void;
  onSearch: (data: FilterModel) => void;
};

export const SearchTransactionsDrawer: React.FC<Props> = ({
  is,
  filter,
  onSearch,
  onClose,
}: Props) => {
  const {
    filterTransactionsParams,
    onUpdateFilter,
    onUpdateFilterKey,
    onResetFilter,
  } = useSearchTransactions();

  const { formRef, setValue, errors, onSubmitForm, onChangeForm } =
    useForm<TransactionsFilterForm>(
      {
        "filter-mode": filterTransactionsParams.mode,
        AND: "",
        OR: "",
      },
      {
        beforeSubmit: () => ({ notValidateFields: ["AND", "OR"] }),
        updateOnChange: (e, { "filter-mode": filterMode }) => {
          switch (e.target.name) {
            case "filter-mode":
              return onUpdateFilterKey("mode", filterMode);
          }
        },
      }
    );
  const accounts = useAppSelector(ACCOUNT_SELECTOR.visibleAccountsSelector);
  const incomeCategories = useAppSelector(
    CATEGORY_SELECTOR.incomeCategoriesSelector
  );
  const withdrawCategories = useAppSelector(
    CATEGORY_SELECTOR.withdrawCategoriesSelector
  );

  useEffect(() => {
    if (is) {
      setValue("filter-mode", filterTransactionsParams.mode);
      onUpdateFilter(filter);
    }
  }, [is]);

  return (
    <Drawer side="right" isOpened={Boolean(is)} onClose={onClose}>
      <Container h100 background="var(--soft-background-color)" width="400px">
        <Offset full padding={[24, 16]}>
          <Flex full column gap={24}>
            <Flex justifyBetween alignCenter>
              <Text as="h3" uppercase>
                Search transactions
              </Text>
              <Button theme="transparent" rounded onClick={onClose}>
                <Icon size={16} name="close" />
              </Button>
            </Flex>

            <form
              className="w100 h100"
              autoComplete="off"
              ref={formRef}
              onChange={onChangeForm}
              onSubmit={onSubmitForm(() => onSearch(filterTransactionsParams))}
            >
              <Scrollable full overlay>
                <Flex column gap={20} full justifyBetween>
                  <Flex w100 column gap={20}>
                    <Flex style={{ flex: 1 }} w100 column gap={6}>
                      <Label>Transaction type</Label>
                      <FormGroup>
                        <Offset padding={[4]}>
                          <Flex wrap gap={8}>
                            {TRANSACTIONS_TYPES.map((item) => {
                              const isActive = filterTransactionsParams[
                                "transaction-types"
                              ].includes(
                                item.type as StoreTransactionsTransactionType
                              );
                              return (
                                <Badge
                                  key={item.type}
                                  active={isActive}
                                  color={item.color}
                                  icon={item.type}
                                  text={item.label}
                                  type="transaction-type"
                                  onClick={() =>
                                    onUpdateFilterKey(
                                      "transaction-types",
                                      item.type
                                    )
                                  }
                                />
                              );
                            })}
                          </Flex>
                        </Offset>
                      </FormGroup>
                    </Flex>
                    {accounts.length ? (
                      <Flex style={{ flex: 1 }} w100 column gap={6}>
                        <Label>Accounts</Label>
                        <FormGroup>
                          <Offset padding={[4]}>
                            <Flex wrap gap={8}>
                              {accounts.map((account) => {
                                const isActive =
                                  filterTransactionsParams.accounts.includes(
                                    account.id
                                  );
                                return (
                                  <Badge
                                    key={account.id}
                                    active={isActive}
                                    color={account.color}
                                    icon="bank-card"
                                    text={account.name}
                                    type="account"
                                    onClick={() =>
                                      onUpdateFilterKey("accounts", account.id)
                                    }
                                  />
                                );
                              })}
                            </Flex>
                          </Offset>
                        </FormGroup>
                      </Flex>
                    ) : null}
                    {incomeCategories.length ? (
                      <Flex style={{ flex: 1 }} w100 column gap={6}>
                        <Label>Income categories</Label>
                        <FormGroup>
                          <Offset padding={[4]}>
                            <Flex wrap gap={8}>
                              {incomeCategories.map((category) => {
                                const isActive =
                                  filterTransactionsParams.categories.includes(
                                    category.id
                                  );
                                return (
                                  <Badge
                                    key={category.id}
                                    active={isActive}
                                    color={category.color}
                                    icon={category.icon}
                                    text={category.name}
                                    type="category"
                                    onClick={() =>
                                      onUpdateFilterKey(
                                        "categories",
                                        category.id
                                      )
                                    }
                                  />
                                );
                              })}
                            </Flex>
                          </Offset>
                        </FormGroup>
                      </Flex>
                    ) : null}
                    {withdrawCategories.length ? (
                      <Flex style={{ flex: 1 }} w100 column gap={6}>
                        <Label>Withdraw categories</Label>
                        <FormGroup>
                          <Offset padding={[4]}>
                            <Flex wrap gap={8}>
                              {withdrawCategories.map((category) => {
                                const isActive =
                                  filterTransactionsParams.categories.includes(
                                    category.id
                                  );

                                return (
                                  <Badge
                                    key={category.id}
                                    active={isActive}
                                    color={category.color}
                                    icon={category.icon}
                                    text={category.name}
                                    type="category"
                                    onClick={() =>
                                      onUpdateFilterKey(
                                        "categories",
                                        category.id
                                      )
                                    }
                                  />
                                );
                              })}
                            </Flex>
                          </Offset>
                        </FormGroup>
                      </Flex>
                    ) : null}
                    <Flex w100 column gap={6}>
                      <Label htmlFor="filter-mode">Filter mode</Label>
                      <RadioGroup
                        data={[
                          {
                            label: "OR",
                            value: "OR",
                          },
                          {
                            label: "AND",
                            value: "AND",
                          },
                        ]}
                        id="filter-mode"
                        name="filter-mode"
                      />
                      <Unwrap
                        visible={Boolean(errors["filter-mode"])}
                        negativeOffset="6px"
                      >
                        <Text size={11} color="var(--text-color-error)">
                          {errors["filter-mode"]}
                        </Text>
                      </Unwrap>
                    </Flex>
                  </Flex>
                  <Flex gap={16}>
                    <Button theme="primary" type="submit">
                      Search
                    </Button>
                    <Button
                      onClick={() => onResetFilter()}
                      style={{ width: "fit-content" }}
                      theme="outline"
                    >
                      <Icon name="trash" />
                    </Button>
                  </Flex>
                </Flex>
              </Scrollable>
            </form>
          </Flex>
        </Offset>
      </Container>
    </Drawer>
  );
};
