import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/CounterSlice'
import SkeletonViewReducer from '../features/skeletonview/SkeletonView'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    skeletonview : SkeletonViewReducer,
  },
})