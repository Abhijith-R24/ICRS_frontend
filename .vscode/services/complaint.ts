import API from "./api";

export const submitComplaint = (data: any) => {
  return API.post("/api/complaints", data);
};

export const getComplaints = () => {
  return API.get("/api/complaints");
};
