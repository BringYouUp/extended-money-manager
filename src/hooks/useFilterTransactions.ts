import { transactionsGetFilteredTransactions } from "@async-actions";
import { useAppDispatch, useUID } from "@hooks";
import { useMemo, useState } from "react";

const INITIAL_STATE: Hooks.UseFilterTransactions.FilterModel = {
  "transaction-types": [],
  accounts: [],
  categories: [],
  mode: 'OR',
}

export const useSearchTransactions = (initialState?: Hooks.UseFilterTransactions.FilterModel) => {
  const uid = useUID()
  const dispatch = useAppDispatch();

  const [filterTransactionsParams, setFilterTransactionsParams] = useState(initialState || INITIAL_STATE)

  const onUpdateFilter = (newData: Hooks.UseFilterTransactions.FilterModel) => {
    setFilterTransactionsParams(newData)
  }

  const onUpdateFilterKey: Hooks.UseFilterTransactions.UpdateFilter = (key, item) => {
    switch (key) {
      case 'categories':
      case 'accounts':
      case 'transaction-types':
        setFilterTransactionsParams(prev => {
          let newValue
          const isToRemove = prev[key].some(_item => _item === item)

          if (isToRemove) {
            newValue = prev[key].filter(_item => _item !== item)
          } else {
            newValue = prev[key].concat(item as Store.TransactionType)
          }

          return ({
            ...prev,
            [key]: newValue
          })
        })
        break
      case 'mode':
        setFilterTransactionsParams(prev => ({
          ...prev,
          [key]: item as 'AND' | 'OR'
        }))
        break
    }
  }

  const onFilter = (): Promise<Store.Transaction[]> => {
    return new Promise((resolve, reject) => {
      dispatch(transactionsGetFilteredTransactions({ uid, filter: filterTransactionsParams }))
        .then(data => {
          if (data.meta.requestStatus === 'rejected') {
            // @ts-expect-error: TODO
            reject(data.error)
          } else {
            resolve(data.payload as Store.Transaction[])
          }
        })
        .catch(reject)
    })
  }

  const onResetFilter = () => {
    setFilterTransactionsParams(INITIAL_STATE)
  }

  const isFilterEmpty = useMemo(() => {
    return !filterTransactionsParams.accounts.length && !filterTransactionsParams.categories.length && !filterTransactionsParams["transaction-types"].length
  }, [filterTransactionsParams])

  return {
    filterTransactionsParams,
    onUpdateFilterKey,
    onFilter,
    isFilterEmpty,
    onResetFilter,
    onUpdateFilter,
  }
};
