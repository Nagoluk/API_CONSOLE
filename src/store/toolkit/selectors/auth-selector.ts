import {RootState} from '../store';

export const getAuthErrorsSelector = (state: RootState) => (state.auth.errors)
export const getAuthLoading = (state: RootState) => (state.auth.loading)
export const getIsLogined = (state: RootState) => (!!state.auth.sessionKey?.length)
export const getSubLogin = (state: RootState) => (state.auth.sublogin)
export const getLogin = (state: RootState) => (state.auth.login)