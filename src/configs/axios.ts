
import axios from 'axios';

console.log("NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL);

let instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
console.log("Axios Base URL:", instance.defaults.baseURL);

// デバッグ用のインターセプター設定
if (process.env.NEXT_PUBLIC_ENV !== 'production') {
  instance.interceptors.request.use(
    (config) => {
      console.log(config);
      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      console.log(response);
      return response;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );
}

export default instance;
