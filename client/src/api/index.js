import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
}, console.log);

const login = (data) => {
  return api.post("/auth/login", {
    email: data.email,
    password: data.password,
  });
};

const me = () => {
  return api.get("/auth/me");
};

const createUser = (data) => {
  return api.post("/user", {
    username: data.username,
    email: data.email,
    password: data.password,
  });
};

export const useApi = () => {
  return {
    login,
    me,
    createUser,
  };
};
