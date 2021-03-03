import { createSlice } from '@reduxjs/toolkit'
import {IError} from '../../../interfaces/common';


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    sessionKey: null as null | string,
    login: null as null | string,
    sublogin: null as null | string,
    errors: null as IError | null
  },
  reducers: {
    authenticate: (state, payload) => {
       state.loading = true
    },

    checkAutorization: (state) => {
      state.loading = true
    },

    setPending: (state, {payload}) => {
      state.loading = payload
    },

    setErrors: (state, payload) => {
      state.errors = payload.payload
    },

    authorizationSuccess: (state, action) => {
      state.loading = false
      state.sessionKey = action.payload.sessionKey
      state.login = action.payload.login
      state.sublogin = action.payload.sublogin
    },

    authorizationFail: (state) => {
      state.loading = false
      state.sessionKey = null
      state.login = null
      state.sublogin = null
    },

    logout: state => {
      state.loading = false
      state.sessionKey = null
    }
  }
})

export const { logout, authorizationSuccess, authorizationFail, authenticate, setErrors, setPending , checkAutorization} = authSlice.actions

export default authSlice.reducer