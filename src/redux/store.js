import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/CounterSlice'
import SkeletonViewReducer from '../features/skeletonview/SkeletonView'
import AuthenticationData from '../features/authenticationData/AuthenticationData'
import OpeningCount from '../features/OpeningCount/OpeningCount'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    skeletonview : SkeletonViewReducer,
    authenticationData : AuthenticationData,
    OpeningCount : OpeningCount,
  },
})