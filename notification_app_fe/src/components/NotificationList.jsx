function NotificationList({ notifications }) {
  return (
    <div>
      {notifications.map((item) => (
        <div
          key={item.ID}
          className="notification-card"
        >
          <h3>{item.Type}</h3>

          <p>{item.Message}</p>

          <small>{item.Timestamp}</small>
        </div>
      ))}
    </div>
  );
}

export default NotificationList;