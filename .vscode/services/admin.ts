import API from "./api";

// Get all complaints (admin)
export const getAllComplaints = async () => {
    return API.get("/api/admin/complaints");
}


// Update complaint status
export const updateComplaintStatus = async (id: string, status: string) => {
    return (API.put(`/api/admin/complaints/${id}`,{status: status, officerId: "68113444c686817494270034"}
        
    ));
}


// Get only emergency complaints
export const getEmergencyComplaints = async () => {
    return API.get("/api/admin/complaints/emergency");
}