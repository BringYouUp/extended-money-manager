import { QueryFieldFilterConstraint, collection, doc, or, where } from "firebase/firestore";
import { db } from '../../../config/firebase'

export const getRef = {
  user: (uid: string) => doc(db, "users", uid),
  accounts: (uid: string) => collection(db, "users", uid, "accounts"),
  account: (uid: string, accountId: string) => doc(db, "users", uid, "accounts", accountId),
  categories: (uid: string) => collection(db, "users", uid, "categories"),
  accountsEdit: (uid: string, id: string) => doc(db, "users", uid, "accounts", id),
  categoriesEdit: (uid: string, id: string) => doc(db, "users", uid, "categories", id),
  transactions: (uid: string) => collection(db, "users", uid, "transactions"),
  transactionsEdit: (uid: string, id: string) => doc(db, "users", uid, "transactions", id),
  platform: () => collection(db, "platform"),
  platformCurrency: () => doc(db, "platform", "currency"),
}

export const generateTransactionsQuery = (params: Hooks.UseFilterTransactions.FilterModel): QueryFieldFilterConstraint[] => {
  let res = []

  if (params["transaction-types"].length) {
    res.push(where('type', "in", params["transaction-types"]))
  }

  if (params.accounts.length) {
    res.push(where('accountId', "in", params.accounts))
  }

  if (params.categories.length) {
    res.push(where('categoryId', "in", params.categories))
  }

  if (res.length && params.mode === 'OR') {
    res = [or(...res)]
  }

  console.log(`→ res`, res);

  return res as QueryFieldFilterConstraint[]
}