import axios from "axios";

const API_URL = "https://672f5d2d229a881691f2b987.mockapi.io";

export const userApi = {
  getUsers: async () => {
    const response = await axios.get(`${API_URL}/Ussers`);
    return response.data;
  },

  createUser: async (userData) => {
    const response = await axios.post(`${API_URL}/Ussers`, userData);
    return response.data;
  },

  updateUser: async (userId, userData) => {
    const response = await axios.put(`${API_URL}/Ussers/${userId}`, userData);
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await axios.delete(`${API_URL}/Ussers/${userId}`); // Use 'id' here
    return response.data;
  },
};
