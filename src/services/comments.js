import { axiosInstance } from "./instance";

export const saveComment = (data) => {
  return axiosInstance.post("CustomerComments", data);
};

export const getAllCommentsByHotel = (hotelId) => {
  return axiosInstance.get(`CustomerComments/${hotelId}`);
};

export const updateComment = (data) => {
  return axiosInstance.put("CustomerComments", data);
};

export const deleteComment = (idComment) => {
  return axiosInstance.delete(`CustomerComments/${idComment}`);
};
