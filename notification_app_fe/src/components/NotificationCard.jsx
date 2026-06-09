function NotificationCard({ notification }) {
  return (
    <div className="notification-card">
      <h3>{notification.type}</h3>

      <p>{notification.message}</p>

      <small>{notification.timestamp}</small>
    </div>
  );
}

export default NotificationCard;