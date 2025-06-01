import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const OpeningCount = createSlice({
  name: 'openingcount',
  initialState,
  reducers: {
    SetOpeningCount: (state,action) => {
      state.value = 1 + action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { SetOpeningCount } = OpeningCount.actions

export default OpeningCount.reducer