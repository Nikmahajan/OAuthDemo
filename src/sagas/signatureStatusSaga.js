import { put } from 'redux-saga/effects';
import { fetchSignature } from '../apis/fetchSignatureAPIs';
import { fetchSignatureStatusSuccess } from '../actions';
import { fetchAccessToken } from '../apis/tokenAPIs';

export function* fetchSignatureStatusSaga() {
  const accessToken = yield fetchAccessToken();
  const resp = yield (fetchSignature(accessToken.access_token));
  if (resp) {
    yield put(fetchSignatureStatusSuccess(resp.signatures));
  }
}

