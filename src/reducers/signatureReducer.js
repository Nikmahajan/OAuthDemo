const signatureReducer = (state = {
  isLoading: false,
  signatureSendSuccess: false,
}, action) => {
  switch (action.type) {
    case 'EMPTY_SIGNATURES':
      return {
        list: [],
      };
    case 'SEND_E_SIGNATURE':
      return {
        ...state,
        isLoading: true,
      };
    case 'SEND_REMINDER_SUCCESS':
      return {
        ...state,
        isLoading: false,
        senReminderSuccess: true,
      };
    case 'SEND_E_SIGNATURE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        signatureSendSuccess: true,
      };
    case 'FETCH_SIGNATURE_STATUS':
      return {
        ...state,
        isLoading: true,
      };
    case 'FETCH_SIGNATURE_SUCCESS':
      return {
        ...state,
        list: action.signatures,
        isLoading: false,
        signatureSendSuccess: false,
      };
    default:
      return state;
  }
};

export default signatureReducer;

const getSignatures = state => state.signatureReducer.list;
const isSendSignatureLoading = state => state.signatureReducer.isLoading;
const signatureSendSuccess = state => state.signatureReducer.signatureSendSuccess;
const sendReminderSuccess = state => state.signatureReducer.signatureSendSuccess;

export const selectors = {
  getSignatures,
  isSendSignatureLoading,
  signatureSendSuccess,
  sendReminderSuccess,
};
