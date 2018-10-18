import { put } from 'redux-saga/effects';
import { sendESignature } from '../apis/eSignatureAPIs';
import { sendESignatureSuccess } from '../actions';

export function* sendESignatureSaga(action) {
  const { url, users } = action;
  const signers = [];
  users.map(signer => (
    signers.push({ email: signer.email, nameOrRole: signer.userName })
  ));
  const resp = yield (sendESignature(url, signers));
  if (resp) {
    yield put(sendESignatureSuccess(resp));
  }
}

