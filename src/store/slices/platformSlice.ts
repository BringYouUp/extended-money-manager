import {
  platformSetPlatform,
  platformSetUpdatePlatformCurrency,
} from "@async-actions";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Store.PlatformSelector = {
  platform: {
    settings: {},
    currency: {
      EUR: 0,
      PLN: 0,
      RUB: 0,
      USD: 0,
      updatedAt: "",
    },
  },
  error: {
    code: "",
    message: "",
  },
  status: "platform/platformSetPlatform/pending",
};

const platform = createSlice({
  name: "platform",
  initialState,
  reducers: {
    clear: (state) => {
      state.platform = initialState.platform;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        platformSetPlatform.fulfilled,
        (state, { payload }: PayloadAction<Store.Platform>) => {
          state.platform = payload || {};
          state.error = initialState.error;
        }
      )
      .addCase(
        platformSetUpdatePlatformCurrency.fulfilled,
        (state, { payload }: PayloadAction<Shared.Currencies.Currencies>) => {
          state.platform.currency = payload || {};
        }
      )
      .addMatcher(
        ({ type }) =>
          type.startsWith("platform/") && type.endsWith("fulfilled"),
        (state) => {
          state.status = null;
        }
      )
      .addMatcher(
        ({ type }) => type.startsWith("platform/") && type.endsWith("rejected"),
        (state, { payload }: PayloadAction<Store.Error>) => {
          state.error = payload;
        }
      );
  },
});

export const { clear } = platform.actions;

export default platform.reducer;
