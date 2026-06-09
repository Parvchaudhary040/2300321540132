const express = require("express");
const axios = require("axios");
const cors = require("cors");
const logger = require("./logger");

const app = express();

app.use(cors());

logger.info("Backend server initialized");

// Paste your latest valid token here
const TOKEN = process.env.TOKEN;

app.get("/notifications", async (req, res) => {
  logger.info(
    "Notifications endpoint called",
    req.query
  );

  try {
    const {
      page = 1,
      limit = 10,
      type = "All",
    } = req.query;

    const response = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    let notifications =
      response.data.notifications;

    // Filter
    if (type !== "All") {
      notifications =
        notifications.filter(
          (notification) =>
            notification.Type === type
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
        priorityMap[b.Type] -
        priorityMap[a.Type];

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
      (Number(page) - 1) *
      Number(limit);

    const endIndex =
      startIndex + Number(limit);

    const paginatedNotifications =
      notifications.slice(
        startIndex,
        endIndex
      );

    logger.info(
      "Notifications fetched successfully",
      {
        total:
          notifications.length,
        page,
        limit,
        type,
      }
    );

    res.json({
      total: notifications.length,
      page: Number(page),
      limit: Number(limit),
      notifications:
        paginatedNotifications,
    });
  } catch (error) {
    logger.error(
      "Notification fetch failed",
      error.response?.data ||
        error.message
    );

    res.status(500).json({
      message:
        "Failed to fetch notifications",
    });
  }
});

app.listen(5000, () => {
  logger.info(
    "Server running on port 5000"
  );
});