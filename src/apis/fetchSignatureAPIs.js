import { GET } from './HTTP';
import { getAccessToken } from '../utils/CookieUtils';

export const fetchSignature = (accessToken) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const url = `${baseUrl}v1/signatures?documentId=2812&sort=-id`;
  return GET({ url, headers });
};

