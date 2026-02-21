import API from "./api";

export const loginUser = (data: any) => {
  return API.post("/auth/login", data);
};

export const registerUser = (data: any) => {
  return API.post("/auth/register", data);
};
