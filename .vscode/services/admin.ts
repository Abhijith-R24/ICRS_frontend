import API from "./api";

// Get all complaints (admin)
export const getAllComplaints = async () => {
  return API.get("/api/complaints");
};

// Update complaint status
export const updateComplaintStatus = async (id: string, status: string) => {
  return API.put(`/api/admin/complaint/${id}/status`, {
    status,
  });
};

// // Get only emergency complaints
 export const getEmergencyComplaints = async () => {
 return API.get("/api/complaints/emergency");
 };
