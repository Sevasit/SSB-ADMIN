import axios from "axios";

const AxiosCustom = axios.create({});

// Axios.defaults.baseURL = "http://localhost:3333";
AxiosCustom.defaults.baseURL = process.env.ENDPOINT_URL_DEV;

export default AxiosCustom;
