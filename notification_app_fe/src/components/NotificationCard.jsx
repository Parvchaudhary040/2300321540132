import {
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";

function NotificationCard({ notification }) {
  const getChipColor = () => {
    switch (notification.Type) {
      case "Result":
        return "success";
      case "Event":
        return "warning";
      case "Placement":
        return "primary";
      default:
        return "default";
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardContent>
        <Chip
          label={notification.Type}
          color={getChipColor()}
          sx={{ mb: 2 }}
        />

        <Typography
          variant="h6"
          fontWeight="bold"
        >
          {notification.Message}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          mt={1}
        >
          {notification.Timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NotificationCard;