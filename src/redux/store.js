import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/CounterSlice'
import SkeletonViewReducer from '../features/skeletonview/SkeletonView'
import AuthenticationData from '../features/authenticationData/AuthenticationData'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    skeletonview : SkeletonViewReducer,
    authenticationData : AuthenticationData,
  },
})