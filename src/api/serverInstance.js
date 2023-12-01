import axios from "axios";
import { getAccessTokenFromLocal } from "lib/localStorage";

export const authServerInstance = axios.create({
  baseURL: process.env.REACT_APP_AUTH_URL,
});

const jsonServerInstance = axios.create({
  baseURL: process.env.REACT_APP_DATA_URL,
});
//TODO: 인증받아야 사용할 수 있게끔 구현해야함
jsonServerInstance.interceptors.request.use(
  async function (config) {
    const token = getAccessTokenFromLocal();

    if (!token) {
      return new Error("Not in token.");
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await authServerInstance.get("/user", { headers });

      if (response.data.success) {
        return config;
      }
      return Promise.reject(response.data);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  function (error) {
    console.error("인터셉터 요청 오류", error);
    return Promise.reject(error);
  },
);

export default jsonServerInstance;
