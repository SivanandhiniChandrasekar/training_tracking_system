import { useState } from "react";
import { useNotifications } from "../context/NotificationContext";

export default function NotificationBell() {
  const { notifications, clearNotifications } = useNotifications();
  const [open, setOpen] = useState(false);

  return (
    <div className="notification-wrapper">
      <div className="icon notify" onClick={() => setOpen(!open)}>
        🔔
        {notifications.length > 0 && (
          <span className="badge">{notifications.length}</span>
        )}
      </div>

      {open && (
        <div className="notification-panel">
          <div className="panel-header">
            <span>Notifications</span>
            <button onClick={clearNotifications}>Clear</button>
          </div>

          {notifications.length === 0 ? (
            <div className="empty">No notifications</div>
          ) : (
            notifications.map((n, i) => (
              <div key={i} className="notification-item">
                {n}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
