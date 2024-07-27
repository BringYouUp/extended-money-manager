import { TRANSACTIONS_TYPES } from "@consts/transactions";
import { Drawer } from "@entities/Drawer";
import { Form } from "@entities/Form";

import { useAppSelector } from "@hooks/useAppSelector";
import { useSearchTransactions } from "@hooks/useFilterTransactions";
import { useForm } from "@hooks/useForm";
import { ACCOUNT_SELECTOR, CATEGORY_SELECTOR } from "@selectors";
import {
  Badge,
  Button,
  Flex,
  FormGroup,
  Icon,
  Offset,
  RadioGroup,
  Scrollable,
} from "@ui";

import { useEffect } from "react";

const RADIO_GROUP_DATA = [
  {
    label: "OR",
    value: "OR",
  },
  {
    label: "AND",
    value: "AND",
  },
];

type Props = {
  filter: Hooks.UseFilterTransactions.FilterModel;
  is: boolean;
  onClose: () => void;
  onSearch: (data: Hooks.UseFilterTransactions.FilterModel) => void;
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
    useForm<Components.Form.TransactionsFilter>(
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
      <Drawer.Container width="400px">
        <Drawer.Content>
          <Flex full column gap={24}>
            <Flex justifyBetween alignCenter>
              <Drawer.Title>Search transactions</Drawer.Title>
              <Drawer.Close onClose={onClose} />
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
                  <Form.Items>
                    <Form.Item style={{ flex: 1 }} label="Transaction type">
                      <FormGroup>
                        <Offset padding={[4]}>
                          <Flex wrap gap={8}>
                            {TRANSACTIONS_TYPES.map((item) => {
                              const isActive = filterTransactionsParams[
                                "transaction-types"
                              ].includes(item.type as Store.TransactionType);
                              return (
                                <Badge
                                  key={item.type}
                                  active={isActive}
                                  badgeColor={item.color}
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
                    </Form.Item>
                    {accounts.length ? (
                      <Form.Item style={{ flex: 1 }} label="Accounts">
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
                                    badgeColor={account.color}
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
                      </Form.Item>
                    ) : null}
                    {incomeCategories.length ? (
                      <Form.Item style={{ flex: 1 }} label="Income categories">
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
                                    badgeColor={category.color}
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
                      </Form.Item>
                    ) : null}
                    {withdrawCategories.length ? (
                      <Form.Item
                        style={{ flex: 1 }}
                        label="Withdraw categories"
                      >
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
                                    badgeColor={category.color}
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
                      </Form.Item>
                    ) : null}

                    <Form.Item
                      label="Filter mode"
                      error={errors["filter-mode"]}
                      htmlFor="filter-mode"
                    >
                      <RadioGroup
                        data={RADIO_GROUP_DATA}
                        id="filter-mode"
                        name="filter-mode"
                      />
                    </Form.Item>
                  </Form.Items>
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
        </Drawer.Content>
      </Drawer.Container>
    </Drawer>
  );
};
