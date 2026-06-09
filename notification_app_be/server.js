const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwYXJ2LjIzYjE1NDEwMzVAYWJlcy5hYy5pbiIsImV4cCI6MTc4MDk5MTE5MCwiaWF0IjoxNzgwOTkwMjkwLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYWZiZTY3NTMtN2UzZS00NjM2LTk0NzctNGFlZjIyYTJkNDQ4IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicGFydiBjaGF1ZGhhcnkiLCJzdWIiOiJhY2FlODE2NC1hODFhLTQyZTgtOTUzYS1lMThiNmJiMTk4NGYifSwiZW1haWwiOiJwYXJ2LjIzYjE1NDEwMzVAYWJlcy5hYy5pbiIsIm5hbWUiOiJwYXJ2IGNoYXVkaGFyeSIsInJvbGxObyI6IjIzMDAzMjE1NDAxMzIiLCJhY2Nlc3NDb2RlIjoiY1h1cWh0IiwiY2xpZW50SUQiOiJhY2FlODE2NC1hODFhLTQyZTgtOTUzYS1lMThiNmJiMTk4NGYiLCJjbGllbnRTZWNyZXQiOiJWbXdXSFZoQ05GSnpuUkZNIn0.hejr3SRynqi007F3Bhx6go0BtZiDshktK1P4vXhJuwY";

app.get("/notifications", async (req, res) => {
  try {
    const { page = 1, limit = 10, type = "All" } = req.query;

    const response = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    let notifications = response.data.notifications;

    // Filter by type
    if (type !== "All") {
      notifications = notifications.filter(
        (notification) => notification.Type === type
      );
    }

    // Priority Sorting
    const priorityMap = {
      Result: 3,
      Event: 2,
      Placement: 1,
    };

    notifications.sort((a, b) => {
      const priorityDiff =
        priorityMap[b.Type] - priorityMap[a.Type];

      if (priorityDiff !== 0) {
        return priorityDiff;
      }

      return (
        new Date(b.Timestamp) -
        new Date(a.Timestamp)
      );
    });

    // Pagination
    const startIndex =
      (Number(page) - 1) * Number(limit);

    const endIndex =
      startIndex + Number(limit);

    const paginatedNotifications =
      notifications.slice(
        startIndex,
        endIndex
      );

    res.json({
      total: notifications.length,
      page: Number(page),
      limit: Number(limit),
      notifications:
        paginatedNotifications,
    });
  } catch (error) {
  console.log("STATUS:");
  console.log(error.response?.status);

  console.log("DATA:");
  console.log(error.response?.data);

  console.log("MESSAGE:");
  console.log(error.message);

  res.status(500).json({
    message: "Failed to fetch notifications",
    error: error.response?.data || error.message,
  });
}
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});