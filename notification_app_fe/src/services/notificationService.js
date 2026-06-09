import axios from "axios";
import { logger } from "../middleware/logger";

const API_URL = "http://localhost:5000/notifications";

export const getNotifications = async (
  page = 1,
  limit = 10,
  type = "All"
) => {
  try {
    logger.info("Fetching notifications", {
      page,
      limit,
      type,
    });

    const response = await axios.get(API_URL, {
      params: {
        page,
        limit,
        type,
      },
    });

    logger.info(
      "Notifications fetched successfully",
      response.data
    );

    return response.data;
  } catch (error) {
    logger.error(
      "Failed to fetch notifications",
      error
    );

    throw error;
  }
};