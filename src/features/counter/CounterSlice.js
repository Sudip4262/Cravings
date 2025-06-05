import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
  LoginStatus:'false'
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    SetCounterValue: (state,action) => {
      state.value = action.payload
    },
    SetCurrentLogin: (state, action) => {
      state.LoginStatus = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { SetCounterValue, SetCurrentLogin } = counterSlice.actions

export default counterSlice.reducer