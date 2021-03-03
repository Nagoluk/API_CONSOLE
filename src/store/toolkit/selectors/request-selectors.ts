import {RootState} from '../store';

export const getResponseError = (state: RootState) => (state.requests.responseError)
export const getResponseValue = (state: RootState) => (state.requests.responseField)
export const getRequestField = (state: RootState) => (state.requests.requestField)
export const getRequestError = (state: RootState) => (state.requests.requestError)