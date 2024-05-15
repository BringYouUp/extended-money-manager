import { transactionsGetFilteredTransactions } from "@async-actions";
import { useAppDispatch, useUID } from "@hooks";
import { StoreTransactionsTransaction, StoreTransactionsTransactionType } from "@models";
import { useMemo, useState } from "react";
import { FilterModel, UpdateFilter } from "src/models/hooks/useFilterTransactions";

const INITIAL_STATE: FilterModel = {
  "transaction-types": [],
  accounts: [],
  categories: [],
  mode: 'OR',
}

export const useSearchTransactions = (initialState?: FilterModel) => {
  const uid = useUID()
  const dispatch = useAppDispatch();

  const [filterTransactionsParams, setFilterTransactionsParams] = useState(initialState || INITIAL_STATE)

  const onUpdateFilter = (newData: FilterModel) => {
    setFilterTransactionsParams(newData)
  }

  const onUpdateFilterKey: UpdateFilter = (key, item) => {
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
            newValue = prev[key].concat(item as StoreTransactionsTransactionType)
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

  const onFilter = (): Promise<StoreTransactionsTransaction[]> => {
    return new Promise((resolve, reject) => {
      dispatch(transactionsGetFilteredTransactions({ uid, filter: filterTransactionsParams }))
        .then(data => {
          if (data.meta.requestStatus === 'rejected') {
            // @ts-expect-error: TODO
            reject(data.error)
          } else {
            resolve(data.payload as StoreTransactionsTransaction[])
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
