import Axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const json = 'application/json';

const baseAPI = Axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: json,
    'Content-Type': json
  }
});
const authAPI = Axios.create({
  baseURL: `${baseUrl}/auth`,
  headers: {
    Accept: json,
    'Content-Type': json
  }
});

export { baseAPI, authAPI };
