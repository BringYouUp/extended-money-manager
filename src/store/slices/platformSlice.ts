import { StorePlatform } from '@models'
import { createSlice } from '@reduxjs/toolkit'

const initialState: StorePlatform = {
  platform: {
    settings: {}
  },
  error: {
    code: '',
    message: ''
  },
  status: 'platform/platformSetpPlatform/pending'
}

const platform = createSlice({
  name: 'platform',
  initialState,
  reducers: {},
  // extraReducers: (builder) => {

  // }
})

// export const { } = transactions.actions;

export default platform.reducer;
