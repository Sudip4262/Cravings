import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    SetCounterValue: (state,action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { SetCounterValue } = counterSlice.actions

export default counterSlice.reducer