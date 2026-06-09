import { useEffect, useState } from "react";
import { fetchNotifications } from "../services/notificationService";
import NotificationList from "../components/NotificationList";
import FilterBar from "../components/FilterBar";

function Home() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await fetchNotifications();
      setNotifications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter(
          (n) => n.type.toLowerCase() === filter
        );

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h1>Campus Notifications</h1>

      <FilterBar
        filter={filter}
        setFilter={setFilter}
      />

      <NotificationList
        notifications={filteredNotifications}
      />
    </div>
  );
}

export default Home;