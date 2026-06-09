import axios from "axios";

const API_URL = "http://localhost:5000/notifications";

export const getNotifications = async (
  page = 1,
  limit = 10,
  type = "All"
) => {
  const response = await axios.get(API_URL, {
    params: {
      page,
      limit,
      type,
    },
  });

  return response.data;
};