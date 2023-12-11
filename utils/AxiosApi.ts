import axios from "axios";

const Axios = axios.create({});

// Axios.defaults.baseURL = "http://localhost:3333";
Axios.defaults.baseURL = process.env.ENDPOINT_URL_DEV;

export default Axios;
