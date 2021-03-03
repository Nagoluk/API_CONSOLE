//@ts-ignore
import api from 'src/helpers/sendsay';
import {addRequest, setRequestError, setResponseError, setResponseField} from '../slices/requests';
//@ts-ignore
import {all, put, takeLatest, select} from 'redux-saga/effects';
import {sendRequest} from '../slices/requests'
import {RootState} from '../store';
import {IRequests} from '../../../interfaces/requests';

export function* sendRequestSaga () {
  const state: RootState = yield select()
  yield put(setRequestError(""))
  yield put(setResponseError(""))

  try {
    let temp = JSON.parse(state.requests.requestField)

    const response: IRequests = yield api.sendsay.request(temp).then((res: any) => {
      return ({id: res['request.id'],
               status: 'success',
               request: JSON.stringify(temp, null, 2),
               action: temp.action, response: JSON.stringify(res, null, 2)
      })

    }).catch((e: any) => {
      return ({id: e['id'],
              status: 'error',
              request: JSON.stringify(e.request, null, 2),
              action: e.action, response: JSON.stringify(e, null, 2)})
    })

    if(response.status === "error"){
      yield put(setResponseError("invalid request"))
    }

    yield put(addRequest(response))
    yield put(setResponseField(response.response))

  }catch (e) {
    yield put(setRequestError("incorrect input"))
  }
}


export default function* root() {
  yield all([
    takeLatest(sendRequest.type, sendRequestSaga),
  ]);
}
