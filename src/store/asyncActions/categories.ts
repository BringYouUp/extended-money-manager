import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRef, getStoreErrorFormat } from "@utils";
import { addDoc, getDocs, setDoc } from "firebase/firestore";

export const categoriesSetCategories = createAsyncThunk<
  Store.Category[],
  string
>(
  "categories/categoriesSetCategories",
  (uid, { rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      const docRef = getRef.categories(uid);

      getDocs(docRef)
        .then((docSnap) => {
          if (docSnap.size) {
            const data: Store.Category[] = [];
            docSnap.forEach((doc) => {
              data.push({
                ...(doc.data() as Store.Category),
                id: doc.id,
              });
            });
            resolve(fulfillWithValue(data));
          } else {
            resolve(fulfillWithValue([]));
          }
        })
        .catch((err) => reject(rejectWithValue(getStoreErrorFormat(err))));
    });
  },
);

export const categoriesAddCategory = createAsyncThunk<
  Store.Category,
  { category: Omit<Store.Category, Store.OmittedDateFields>; uid: string }
>(
  "categories/categoriesAddCategory",
  ({ category, uid }, { rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      const docRef = getRef.categories(uid);

      addDoc(docRef, category)
        .then((data) => {
          resolve(
            fulfillWithValue({
              ...category,
              id: data.id,
            } as Store.Category),
          );
        })
        .catch((err) => reject(rejectWithValue(getStoreErrorFormat(err))));
    });
  },
);

export const categoriesEditCategory = createAsyncThunk<
  Partial<Store.Category> & Pick<Store.Category, "id">,
  {
    category: Partial<Store.Category> & Pick<Store.Category, "id">;
    uid: string;
  }
>(
  "categories/categoriesEditCategory",
  ({ category, uid }, { rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      const docRef = getRef.categoriesEdit(uid, category.id);

      setDoc(docRef, category, { merge: true })
        .then(() => resolve(fulfillWithValue(category)))
        .catch((err) => reject(rejectWithValue(getStoreErrorFormat(err))));
    });
  },
);
