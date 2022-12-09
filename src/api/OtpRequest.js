import axios from "axios";
const API = axios.create({ baseURL: `${process.env.REACT_APP_BACKEND_URL}` });
export const sendOtp = async (data) => {
  console.log(data, "ooooooo");
  const resp = await API.post("/auth/sendotp", { data });
  console.log(resp, "kkk");
  return resp;
};
