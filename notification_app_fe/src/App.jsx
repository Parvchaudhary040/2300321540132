import { useEffect, useState } from "react";
import { getNotifications } from "./services/notificationService";
import NotificationList from "./components/NotificationList";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();

      const priorityMap = {
        Result: 3,
        Event: 2,
        Placement: 1,
      };

      const sortedNotifications = [...data]
        .sort((a, b) => {
          const priorityDifference =
            priorityMap[b.Type] -
            priorityMap[a.Type];

          if (priorityDifference !== 0)
            return priorityDifference;

          return (
            new Date(b.Timestamp) -
            new Date(a.Timestamp)
          );
        })
        .slice(0, 10);

      setNotifications(sortedNotifications);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Campus Notifications</h1>

      <NotificationList
        notifications={notifications}
      />
    </div>
  );
}

export default App;