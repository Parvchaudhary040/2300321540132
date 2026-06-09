import axios from "axios";

const API_URL =
  "http://localhost:5000/notifications";

export const getNotifications = async (
  page,
  limit,
  type
) => {
  const response = await axios.get(
    API_URL,
    {
      params: {
        page,
        limit,
        type,
      },
    }
  );

  return response.data;
};