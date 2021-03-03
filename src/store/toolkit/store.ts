import { combineReducers } from '@reduxjs/toolkit'
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import authSlice from './slices/auth'
import requestsSlice from './slices/requests';
import rootSage from './saga'
import { useDispatch } from 'react-redux'

import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()


const rootReducer = combineReducers({
  auth: authSlice,
  requests: requestsSlice
})

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware] as const
})
sagaMiddleware.run(rootSage)


export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store



