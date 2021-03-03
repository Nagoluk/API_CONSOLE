//@ts-ignore
import api from 'src/helpers/sendsay';
//@ts-ignore
import {all, call, put, takeLatest} from 'redux-saga/effects';

import {
  authenticate,
  authorizationFail,
  authorizationSuccess, checkAutorization,
  logout,
  setErrors,
  setPending,
} from '../slices/auth';
import {IError} from '../../../interfaces/common';
import {ILogin, ILoginWithSessionKey} from '../../../interfaces/login';
import {PayloadAction } from '@reduxjs/toolkit';

export function* authenticateCheckSaga() {
  try {
    const a: ILoginWithSessionKey = yield api.sendsay.request({
      action: 'pong',
    }).then((res: any) => {
      return {login: res.account, sublogin: res.sublogin, sessionKey: api.sendsay.session};
    });

    yield put(authorizationSuccess(a))
  } catch (error) {
    if (error.id === 'error/auth/failed') {
      yield call(logoutSaga);
    }
  }
}

export function* authenticateSaga({payload}: PayloadAction<ILogin>) {
  yield put(setErrors(null))

  let errors: IError = yield api.sendsay
    .login({
      login: payload.login,
      sublogin: payload.sublogin,
      password: payload.password,
    })
    .then(() => {
      document.cookie = `sendsay_session=${api.sendsay.session}`;
    })
    .catch((err: string) => {
      document.cookie = '';
      return err
    });

  if(errors) {
    yield put(setErrors({id: errors.id, explain: errors.explain}))
    yield put(setPending(false))
  }else {
    yield put(
      authorizationSuccess({
        sessionKey: api.sendsay.session,
        login: payload.login,
        sublogin: payload.sublogin,
      })
    );
  }
}

export function* logoutSaga() {
  document.cookie = "sendsay_session= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
  yield put(authorizationFail());
}

export default function* root() {
  yield all([
    takeLatest(checkAutorization.type, authenticateCheckSaga),
    takeLatest(authenticate.type, authenticateSaga),
    takeLatest(logout.type, logoutSaga),
  ]);
}
