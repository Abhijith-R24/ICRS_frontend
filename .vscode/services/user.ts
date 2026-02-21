import API from "./api";

export const getProfile = () => {
  return API.get("/user/profile");
};

export const updateProfile = (data: any) => {
  return API.put("/user/profile", data);
};
