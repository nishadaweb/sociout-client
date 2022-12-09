import axios from "axios";
const API = axios.create({ baseURL: `${process.env.REACT_APP_BACKEND_URL}` });
export const verifyOtp = (data) => API.post("/auth/verifyotp", { data });
