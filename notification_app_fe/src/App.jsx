import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  Button,
  Box,
  CircularProgress,
  Paper,
  Grid,
} from "@mui/material";

import { getNotifications } from "./services/notificationService";
import NotificationCard from "./components/NotificationCard";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("All");
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const limit = 10;

  useEffect(() => {
    loadNotifications();
  }, [page, type]);

  const loadNotifications = async () => {
    try {
      setLoading(true);

      const data = await getNotifications(
        page,
        limit,
        type
      );

      setNotifications(data.notifications);
      setTotal(data.total);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b)",
        py: 5,
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          color="white"
          gutterBottom
        >
          Campus Notifications
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          color="gray"
          mb={4}
        >
          Stay updated with Results, Events and
          Placement opportunities.
        </Typography>

        {/* Stats Card */}
        <Paper
          elevation={4}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h6">
            Total Notifications
          </Typography>

          <Typography
            variant="h4"
            color="primary"
            fontWeight="bold"
          >
            {total}
          </Typography>
        </Paper>

        {/* Filter */}
        <Paper
          elevation={4}
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 3,
          }}
        >
          <Typography
            variant="subtitle1"
            mb={1}
          >
            Filter Notifications
          </Typography>

          <Select
            fullWidth
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setPage(1);
            }}
          >
            <MenuItem value="All">
              All Notifications
            </MenuItem>

            <MenuItem value="Result">
              Results
            </MenuItem>

            <MenuItem value="Event">
              Events
            </MenuItem>

            <MenuItem value="Placement">
              Placements
            </MenuItem>
          </Select>
        </Paper>

        {/* Loading */}
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            mt={5}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {notifications.map(
              (notification) => (
                <Grid
                  item
                  xs={12}
                  key={notification.ID}
                >
                  <NotificationCard
                    notification={
                      notification
                    }
                  />
                </Grid>
              )
            )}
          </Grid>
        )}

        {/* Pagination */}
        <Box
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            mt: 4,
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

          <Typography
            color="white"
            fontWeight="bold"
          >
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
    </Box>
  );
}

export default App;