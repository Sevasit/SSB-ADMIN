import axios from "axios";
import { getSession } from "next-auth/react";

// const baseURL = process.env.NEXT_PUBLIC_ENDPOINT_URL_DEV;
const baseURL = process.env.NEXT_PUBLIC_ENDPOINT_URL_PROD;

const AxiosCustom = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosCustom.interceptors.request.use(async (request) => {
  const session = await getSession();
  if (session) {
    request.headers.Authorization = `Bearer ${session.jwt}`;
  }

  return request;
});

export default AxiosCustom;
