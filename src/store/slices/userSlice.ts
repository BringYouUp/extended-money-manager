import { userLogOut, userSetUser } from "@async-actions/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    email: "",
    displayName: "",
    phoneNumber: "",
    uid: "",
    emailVerified: false,
    photoURL: "",
  },
  error: {
    code: "",
    message: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clear: (state) => {
      state.user = initialState.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        userSetUser.fulfilled,
        (state, { payload }: PayloadAction<Store.User>) => {
          state.user = payload;
        }
      )
      .addCase(userLogOut.fulfilled, (state) => {
        state.user = initialState.user;
      })
      .addMatcher(
        ({ type }) => type.startsWith("user/") && type.endsWith("pending"),
        (state) => {
          state.error = initialState.error;
        }
      )
      .addMatcher(
        ({ type }) => type.startsWith("user/") && type.endsWith("rejected"),
        (state, { payload }: PayloadAction<Store.Error>) => {
          state.error = payload;
        }
      );
  },
});

export const { clear } = userSlice.actions;

export default userSlice.reducer;
