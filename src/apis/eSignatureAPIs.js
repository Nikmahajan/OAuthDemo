import { POST } from './HTTP';
import { getAccessToken } from '../utils/CookieUtils';

export const sendESignature = (fileUrl, signers) => {
  const headers = {
    Authorization: `Bearer ${getAccessToken()}`,
  };
  const url = `${baseUrl}v1/signatures`;
  const mode = () => {
    if (fileUrl.search('default') === -1) {
      return 'textTags';
    }
    return 'default';
  };
  const body = {
    'title': 'ThinkHR Handbook New',
    'subject': 'The New Handbook we talked about',
    'message': 'Please sign this Handbook and then we can discuss more. Let me know if you have any questions.',
    signers,
    'file': fileUrl,
    'documentType': 'handbook',
    'documentId': '2812',
    'testMode': true,
    'mode': mode(),
  };
  return POST({ url, headers, body });
};

