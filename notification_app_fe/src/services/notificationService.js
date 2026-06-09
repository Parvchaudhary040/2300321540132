const API_URL =
  "http://24.199.145.13/evaluation-service/notifications";

export const fetchNotifications = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  const data = await response.json();

  return data.notifications;
};