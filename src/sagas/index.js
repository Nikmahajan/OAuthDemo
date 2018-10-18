import { takeLatest } from 'redux-saga/effects';
import { fetchCompaniesSaga } from './companiesSagas';
import {
  fetchAccessTokenSaga,
  fetchAccessTokenFromCodeSaga,
  fetchPaylocityAccessTokenSaga,
  fetchExchangeGoogleAccessTokenSaga,
  fetchGoogleAccessTokenSaga,
} from './tokenSagas';
import { sendESignatureSaga } from './eSignatureSagas';
import { fetchSignatureStatusSaga } from './signatureStatusSaga';
import { sendReminderSaga } from './sendReminderSaga';

const sagas = [
  takeLatest('FETCH_COMPANIES', fetchCompaniesSaga),
  takeLatest('FETCH_ACCESS_TOKEN', fetchAccessTokenSaga),
  takeLatest('FETCH_ACCESS_TOKEN_FROM_CODE', fetchAccessTokenFromCodeSaga),
  takeLatest('FETCH_PAYLOCITY_ACCESS_TOKEN', fetchPaylocityAccessTokenSaga),
  takeLatest('FETCH_EXCHANGE_GOOGLE_ACCESS_TOKEN', fetchExchangeGoogleAccessTokenSaga),
  takeLatest('FETCH_GOOGLE_ACCESS_TOKEN', fetchGoogleAccessTokenSaga),
  takeLatest('SEND_E_SIGNATURE', sendESignatureSaga),
  takeLatest('SEND_REMINDER', sendReminderSaga),
  takeLatest('FETCH_SIGNATURE_STATUS', fetchSignatureStatusSaga),

];

export default sagas;
