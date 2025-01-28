import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const SkeletonView = createSlice({
  name: 'skeletonview',
  initialState,
  reducers: {
    SetSkeletonView: (state,action) => {
      state.value = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { SetSkeletonView } = SkeletonView.actions

export default SkeletonView.reducer