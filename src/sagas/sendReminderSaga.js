import { put } from 'redux-saga/effects';
import { sendESignature } from '../apis/eSignatureAPIs';
import { sendESignatureSuccess, sendReminderSuccess } from '../actions';
import { sendReminder } from '../apis/sendReminderApi';

export function* sendReminderSaga(action) {
  const { user } = action;
  const resp = yield (sendReminder(user.signatureRequestId, user.signerEmail));
  if (resp) {
    yield put(sendReminderSuccess(resp));
  }
}

