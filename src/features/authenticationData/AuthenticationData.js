import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name : '',
  email : '',
  phone : '',
  address : '',
  cart : [],
  orders: [],
  petname : '',
  location : '',
}


export const AuthenticationData = createSlice({
  name: 'AuthenticationData',
  initialState,
  reducers: {
    SetAuthenticationName: (state,action) => {
      state.name = action.payload;
    },
    SetAuthenticationEmail: (state,action) => {
        state.email = action.payload;
      },
      SetAuthenticationPhone: (state,action) => {
        state.phone = action.payload;
      },
      SetAuthenticationAddress: (state,action) => {
        state.address = action.payload;
      },
      SetAuthenticationCart: (state,action) => {
        state.cart = action.payload;
      },
      SetAuthenticationOrders: (state,action) => {
        state.orders = action.payload;
      },
      SetAuthenticationPetName: (state,action) => {
        state.petname = action.payload;
      },
      SetAuthenticationLocation: (state,action) => {
        state.location = action.payload;
      },
  },
})


// Action creators are generated for each case reducer function
export const { 
    SetAuthenticationName, 
    SetAuthenticationEmail, 
    SetAuthenticationPhone , 
    SetAuthenticationAddress, 
    SetAuthenticationCart, 
    SetAuthenticationOrders, 
    SetAuthenticationPetName, 
    SetAuthenticationLocation  } = AuthenticationData.actions

export default AuthenticationData.reducer