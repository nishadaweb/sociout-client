import axios from "axios";
const API = axios.create({ baseURL: `${process.env.REACT_APP_BACKEND_URL}` });

export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`);
export const likePost = (id, userId) => {
  console.log(userId, "jdsbd");
  API.put(`post/${id}/like`, { userId: userId });
};
export const addComment = (comment, userId, id) => {
  console.log(comment, userId);
  return API.put(`/post/${id}/comment`, { comment, userId });
};
export const deletePost = (id, userId) => API.delete(`/post/${id}/${userId}`);
export const savedPost = (id, userId) => API.post(`/post/${id}/${userId}/save`);
export const reportPost = (id, userId, data) =>
  API.put(`/post/${id}/${userId}/report`, data);
