import { categoriesAddCategory, categoriesEditCategory, categoriesSetCategories } from '@async-actions'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: Store.CategorySelector = {
  categories: [],
  error: {
    code: '',
    message: ''
  },
  status: 'categories/categoriesSetCategories/pending'
}

const categories = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clear: (state) => {
      state.categories = initialState.categories
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoriesSetCategories.fulfilled, (state, { payload }: PayloadAction<Store.Category[]>) => {
        state.categories = payload || []
        state.error = initialState.error
      })
      .addCase(categoriesAddCategory.fulfilled, (state, { payload }: PayloadAction<Store.Category>) => {
        state.categories.push(payload)
        state.error = initialState.error
      })
      .addCase(categoriesEditCategory.fulfilled, ((state, { payload }: PayloadAction<Partial<Store.Category> & Pick<Store.Category, 'id'>>) => {
        const index = state.categories.findIndex(category => category.id === payload.id);

        state.categories[index] = {
          ...state.categories[index],
          ...payload
        }
      }))
      .addMatcher(
        ({ type }) => type.startsWith('categories/') && type.endsWith('pending'),
        (state, { type }) => {
          state.error = initialState.error
          state.status = type
        }
      )
      .addMatcher(
        ({ type }) => type.startsWith('categories/') && type.endsWith('fulfilled'),
        (state) => {
          state.status = null
        }
      )
      .addMatcher(
        ({ type }) => type.startsWith('categories/') && type.endsWith('rejected'),
        (state, { payload }: PayloadAction<Store.Error>) => {
          state.error = payload
        }
      )
  }
})

export const { clear } = categories.actions;

export default categories.reducer;
