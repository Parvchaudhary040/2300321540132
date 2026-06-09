import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Select,
  MenuItem,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";

import { getNotifications } from "./services/notificationService";

import NotificationCard from "./components/NotificationCard";

function App() {
  const [notifications, setNotifications] =
    useState([]);

  const [page, setPage] = useState(1);

  const [type, setType] =
    useState("All");

  const [loading, setLoading] =
    useState(false);

  const [total, setTotal] =
    useState(0);

  const limit = 10;

  useEffect(() => {
    loadNotifications();
  }, [page, type]);

  const loadNotifications = async () => {
    try {
      setLoading(true);

      const data =
        await getNotifications(
          page,
          limit,
          type
        );

      setNotifications(
        data.notifications
      );

      setTotal(data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{ mt: 4 }}
    >
      <Typography
        variant="h3"
        align="center"
        gutterBottom
      >
        Campus Notifications
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Select
          fullWidth
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
        >
          <MenuItem value="All">
            All
          </MenuItem>

          <MenuItem value="Result">
            Result
          </MenuItem>

          <MenuItem value="Event">
            Event
          </MenuItem>

          <MenuItem value="Placement">
            Placement
          </MenuItem>
        </Select>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        notifications.map(
          (notification) => (
            <NotificationCard
              key={notification.ID}
              notification={
                notification
              }
            />
          )
        )
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent:
            "space-between",
          mt: 3,
        }}
      >
        <Button
          variant="contained"
          disabled={page === 1}
          onClick={() =>
            setPage(page - 1)
          }
        >
          Previous
        </Button>

        <Typography>
          Page {page}
        </Typography>

        <Button
          variant="contained"
          disabled={
            page * limit >= total
          }
          onClick={() =>
            setPage(page + 1)
          }
        >
          Next
        </Button>
      </Box>
    </Container>
  );
}

export default App;