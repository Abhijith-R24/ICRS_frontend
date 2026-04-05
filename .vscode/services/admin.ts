import API from "./api";

// Get all complaints (admin)
export const getAllComplaints = async () => {
  return API.get("/api/complaints");
};

// Update complaint status
export const updateComplaintStatus = async (id: string, data: { status: string; comment?: string }) => {
  return API.put(
    `https://8psmpbxw-8000.inc1.devtunnels.ms/api/admin/complaint/${id}/status`,
    data
  );
};

// // Get only emergency complaints
export const getEmergencyComplaints = async (id: string) => {
  return API.get(`/api/complaint/${id}/emergency`);
};
