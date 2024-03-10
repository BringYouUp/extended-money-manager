import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { StoreUserError, StoreUserUser } from '../../models'

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
    setUser: (state, payload: PayloadAction<StoreUserUser>) => {
      state.user = payload.payload
      state.error = initialState.error
    },
    clearUser: (state) => {
      state.user = initialState.user
    },
    setError: (state, payload: PayloadAction<StoreUserError>) => {
      state.error = payload.payload
    },
    clearError: (state) => {
      state.error = initialState.error
    }
  }
})


export const {
  setUser,
  clearUser,
  setError,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;
