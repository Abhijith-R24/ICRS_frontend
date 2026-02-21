import API from "./api";

export const submitComplaint = (data: any) => {
  return API.post("/complaints", data);
};

export const getComplaints = () => {
  return API.get("/complaints");
};
