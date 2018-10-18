import { GET } from './HTTP';
import { getAccessToken } from '../utils/CookieUtils';

export const fetchCompanies = () => {
  const headers = {
    Authorization: `Bearer ${getAccessToken()}`,
  };
  const url = `${baseUrl}v1/users?limit=5&searchHelp=esignature`;
  return GET({ url, headers });
};

