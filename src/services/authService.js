import axios from "axios";

const API_URL = "http://localhost:5000/api";

const authService = {
  login: async (data) => {
    const response = await axios.post(`${API_URL}/login`, data);
    localStorage.setItem("token", response.data.token);
    return response.data;
  },
  register: async (data) => axios.post(`${API_URL}/register`, data),
  getDashboard: async () => {
    const token = localStorage.getItem("token");
    return axios.get(`${API_URL}/dashboard`, {
      headers: { Authorization: token },
    });
  },
};

export default authService;
