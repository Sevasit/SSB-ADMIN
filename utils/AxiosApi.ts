import axios from "axios";
import { getSession } from "next-auth/react";

const AxiosCustom = axios.create({});

// Axios.defaults.baseURL = "http://localhost:3333";
AxiosCustom.defaults.baseURL = process.env.ENDPOINT_URL_DEV;
AxiosCustom.interceptors.request.use(async (request) => {
  const session = await getSession();
  if (session) {
    request.headers.Authorization = `Bearer ${session.jwt}`;
  }

  return request;
});

export default AxiosCustom;
