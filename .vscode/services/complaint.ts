import API from "./api";

export const submitComplaint = async (data: any) => {
  const formData = new FormData();

  // Add text fields
  formData.append("userId", data.userId);
  formData.append("reportedBy", data.reportedBy);
  formData.append("phone", data.phone);
  formData.append("email", data.email);
  formData.append("crimeType", data.crimeType);
  formData.append("description", data.description);
  formData.append("location", data.location);
  formData.append("date", data.date);
  formData.append("isEmergency", String(data.isEmergency));

  // Add image files
  data.evidence.images.forEach((uri: string) => {
    formData.append("images", {
      uri,
      name: uri.split("/").pop() || "image.jpg",
      type: "image/jpeg",
    } as any);
  });

  // Add video files
  data.evidence.videos.forEach((uri: string) => {
    formData.append("videos", {
      uri,
      name: uri.split("/").pop() || "video.mp4",
      type: "video/mp4",
    } as any);
  });

  // Add document files
  data.evidence.documents.forEach((uri: string) => {
    formData.append("documents", {
      uri,
      name: uri.split("/").pop() || "document.pdf",
      type: "application/pdf",
    } as any);
  });

  return API.post("/api/complaints", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const getMyComplaints = (userId: string) => {
  return API.get(`/api/complaints/my/${userId}`);
};

export const getComplaints = () => {
  return API.get(`/api/complaints/`);
};
export const markEmergency = (id: string) => {
  return API.post(`/api/complaints/${id}`);
};
