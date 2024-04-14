import { getRef, getStoreUserErrorFormat } from '@utils';
import { addDoc, getDocs, setDoc } from 'firebase/firestore';
import { StoreCategoriesCategory, StoreCategoriesCategories, OmittedStoreFields } from '@models';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const categoriesSetCategories = createAsyncThunk<StoreCategoriesCategories, string>(
  'categories/categoriesSetCategories',
  (uid, { rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      const docRef = getRef.categories(uid)

      getDocs(docRef)
        .then(docSnap => {
          if (docSnap.size) {
            const data: StoreCategoriesCategories = []
            docSnap.forEach(doc => {
              data.push({
                ...doc.data() as StoreCategoriesCategory,
                id: doc.id
              })
            })
            resolve(fulfillWithValue(data))
          } else {
            resolve(fulfillWithValue([]))
          }
        })
        .catch(err => reject(rejectWithValue(getStoreUserErrorFormat(err))))
    })
  }

)

export const categoriesAddCategory = createAsyncThunk<StoreCategoriesCategory, { category: Omit<StoreCategoriesCategory, OmittedStoreFields>, uid: string }>(
  'categories/categoriesAddCategory',
  ({ category, uid }, { rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      const docRef = getRef.categories(uid)

      addDoc(docRef, category)
        .then(data => {
          resolve(fulfillWithValue({
            ...category,
            id: data.id,
          } as StoreCategoriesCategory))
        })
        .catch(err => reject(rejectWithValue(getStoreUserErrorFormat(err))))
    })
  }
)

export const categoriesEditCategory = createAsyncThunk<Partial<StoreCategoriesCategory> & Pick<StoreCategoriesCategory, "id">, { category: Partial<StoreCategoriesCategory> & Pick<StoreCategoriesCategory, 'id'>, uid: string }>(
  'categories/categoriesEditCategory',
  ({ category, uid }, { rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      const docRef = getRef.categoriesEdit(uid, category.id)

      setDoc(docRef, category, { merge: true })
        .then(() => resolve(fulfillWithValue(category)))
        .catch(err => reject(rejectWithValue(err)))
    })
  }
)