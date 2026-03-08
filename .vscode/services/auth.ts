import API from "./api";

export const loginUser = (data: any) => {
  return API.post("/api/auth/login", data);
};

export const registerUser = (data: any) => {
  console.log("Registering user with data:", data);
  return API.post("/api/auth/register", data);
};
