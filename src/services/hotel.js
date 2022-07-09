import { axiosInstance } from "../services/instance";

export const createNewHotel = (data) => {
  return axiosInstance.post("Hotel", data);
};

export const updateHotel = (data) => {
  return axiosInstance.put("Hotel", data);
};

export const deleteHotel = (id) => {
  return axiosInstance.delete(`Hotel/${id}`);
};

export const getAllHotels = () => {
  return axiosInstance.get("Hotel");
};

export const getHotelsByCategory = (category) => {
  return axiosInstance.get(`Hotel/${category}`);
};

export const getHotelsHigherPrice = () => {
  return axiosInstance.get("Hotel/order-desc");
};

export const getHotelsLowestPrice = () => {
  return axiosInstance.get("Hotel/order-asc");
};
