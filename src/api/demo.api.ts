import api from "@/lib/api";

export const getDemoData = async () => {
  const response = await api.get("/demo");
  return response.data;
};
