import { StoreCategories, StoreCategoriesCategory, StoreCategoriesCategories, StoreCategoriesError } from '@models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: StoreCategories = {
  categories: [],
  error: {
    code: '',
    message: ''
  },
}

const categories = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, { payload }: PayloadAction<StoreCategoriesCategories>) => {
      state.categories = payload || []
      state.error = initialState.error
    },
    editCategory: (state, { payload }: PayloadAction<Partial<StoreCategoriesCategory> & Pick<StoreCategoriesCategory, 'id'>>) => {
      const index = state.categories.findIndex(category => category.id === payload.id);

      state.categories[index] = {
        ...state.categories[index],
        ...payload
      }
    },
    addCategory: (state, { payload }: PayloadAction<StoreCategoriesCategory>) => {
      state.categories.push(payload)
      state.error = initialState.error
    },
    clearCategories: (state) => {
      state.categories = initialState.categories
    },
    setError: (state, { payload }: PayloadAction<StoreCategoriesError>) => {
      state.error = payload
    },
    clearError: (state) => {
      state.error = initialState.error
    }
  }
})


export const {
  setCategories,
  addCategory,
  editCategory,
  clearCategories,
  setError,
  clearError,
} = categories.actions;

export default categories.reducer;
