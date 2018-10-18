import { POST } from './HTTP';
import { getAccessToken } from '../utils/CookieUtils';

export const sendReminder = (signatureReqId, signerEmail) => {
  const headers = {
    Authorization: `Bearer ${getAccessToken()}`,
  };
  const url = `${baseUrl}v1/signatures/${signatureReqId}`;
  const body = {
    'email': signerEmail,
  };
  return POST({ url, headers, body });
};
