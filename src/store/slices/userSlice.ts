import { StoreUserError, StoreUserUser } from '@models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { userSetUser, userLogOut } from '@async-actions'

const initialState = {
  user: {
    email: '',
    displayName: '',
    phoneNumber: '',
    uid: '',
    emailVerified: false,
    photoURL: ''
  },
  error: {
    code: '',
    message: ''
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = initialState.user
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSetUser.fulfilled, (state, { payload }: PayloadAction<StoreUserUser>) => {
        state.user = payload
      })
      .addCase(userLogOut.fulfilled, (state) => {
        state.user = initialState.user
      })
      .addMatcher(
        ({ type }) => type.startsWith('user/') && type.endsWith('pending'),
        (state) => {
          state.error = initialState.error
        }
      )
      .addMatcher(
        ({ type }) => type.startsWith('user/') && type.endsWith('rejected'),
        (state, { payload }: PayloadAction<StoreUserError>) => {
          state.error = payload
        }
      );
  }
})


export const {
  clearUser,
} = userSlice.actions;

export default userSlice.reducer;
