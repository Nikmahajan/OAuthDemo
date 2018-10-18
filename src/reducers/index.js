import { combineReducers } from 'redux';
import companyReducer from './companyReducer';
import token from './tokenReducer';
import signatureReducer from './signatureReducer';

export default combineReducers({
  companyReducer,
  token,
  signatureReducer,
});
