import login from './auth';
import request from './request';
//@ts-ignore
import {all, fork} from 'redux-saga/effects';



export default function* root() {
  yield all([fork(login), fork(request)]);
}