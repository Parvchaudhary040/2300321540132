import axios from "axios";
import { logger } from "../middleware/logger";

const API_URL =
  "http://4.224.186.213/evaluation-service/notifications";

export const getNotifications = async () => {
  try {
    logger.info("Fetching notifications");

    const response = await axios.get(API_URL);

    logger.info(
      "Notifications fetched successfully",
      response.data
    );

    return response.data.notifications;
  } catch (error) {
    logger.error("API Error", error);

    throw error;
  }
};