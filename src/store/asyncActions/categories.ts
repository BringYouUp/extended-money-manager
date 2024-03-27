import { CATEGORIES_SLICE } from '@slices';
import { getRef, getStoreUserErrorFormat } from '@utils';
import { AppDispatch } from '@store';
import { addDoc, getDocs, setDoc } from 'firebase/firestore';
import { StoreCategoriesCategory, StoreCategoriesCategories } from '@models';

export const categoriesSetCategories = (uid: string) => (dispatch: AppDispatch) => {
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
          dispatch(CATEGORIES_SLICE.setCategories(data))
          resolve(data)
        } else {
          dispatch(CATEGORIES_SLICE.setCategories([]))
          resolve([])
        }
      })
      .catch(reject)
  })
}

export const categoriesAddCategory = (category: Omit<StoreCategoriesCategory, 'id' | 'createdAt'>, uid: string) => (dispatch: AppDispatch) => {
  return new Promise((resolve, reject) => {
    const docRef = getRef.categories(uid)
    const editedCategory: Omit<StoreCategoriesCategory, 'id'> = {
      ...category,
      createdAt: new Date().toISOString()
    }

    addDoc(docRef, editedCategory)
      .then(data => {
        dispatch(CATEGORIES_SLICE.addCategory({
          ...editedCategory,
          id: data.id,
        }))
        resolve(category)
      })
      .catch(err => {
        console.log(`→ error`, err);
        dispatch(CATEGORIES_SLICE.setError(getStoreUserErrorFormat(err)))
        reject(err)
      })
  })
}

export const categoriesEditCategory = (category: Partial<StoreCategoriesCategory> & Pick<StoreCategoriesCategory, 'id'>, uid: string) => (dispatch: AppDispatch) => {
  return new Promise((resolve, reject) => {
    const docRef = getRef.categoriesEdit(uid, category.id)

    console.log(`→ category`, category);
    setDoc(docRef, category, { merge: true })
      .then(() => {
        dispatch(CATEGORIES_SLICE.editCategory(category))
        resolve(category)
      })
      .catch(err => {
        console.log(`→ error`, err);
        dispatch(CATEGORIES_SLICE.setError(getStoreUserErrorFormat(err)))
        reject(err)
      })
  })
}
