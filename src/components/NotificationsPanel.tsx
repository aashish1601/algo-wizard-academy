
import React from "react";

export interface Notification {
  id: number;
  message: string;
  type: "success" | "error";
  time: string;
}

interface NotificationsPanelProps {
  notifications: Notification[];
  onClear: () => void;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ notifications, onClear }) => {
  return (
    <div className="bg-white rounded shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-sm text-gray-700">SNS Notifications</span>
        <button className="text-xs text-wizard-accent" onClick={onClear}>Clear</button>
      </div>
      {notifications.length === 0 ? (
        <p className="text-xs text-gray-400">No notifications</p>
      ) : (
        <ul>
          {notifications.map(n => (
            <li key={n.id} className={`my-2 text-sm ${n.type === "success" ? "text-green-600" : "text-red-600"}`}>
              <span className="font-mono">{n.time}</span> — {n.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationsPanel;
