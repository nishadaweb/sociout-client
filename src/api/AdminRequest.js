import axios from "axios";
const API = axios.create({ baseURL: `${process.env.REACT_APP_BACKEND_URL}` });
export const getUsers = () => API.get("/admin/users");
export const blockUser = (id) => API.put(`/admin/${id}`);
export const getAllPosts = () => API.get("/admin/posts");
export const getAllReportedPosts = () => API.get("/admin/rposts");
export const deleteReportedPosts = (id, uid) =>
  API.delete(`/admin/${id}/${uid}/report`);
