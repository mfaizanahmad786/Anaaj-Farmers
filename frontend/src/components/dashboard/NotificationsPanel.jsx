import { Bell, FileText, AlertTriangle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const NotificationsPanel = () => {
  const notifications = [
    {
      icon: AlertTriangle,
      title: 'Weather Warning!',
      time: 'Just now',
      color: 'text-red-500 bg-red-50',
    },
    {
      icon: FileText,
      title: 'New Blog',
      time: '59 minutes ago',
      color: 'text-blue-500 bg-blue-50',
    },
    {
      icon: AlertTriangle,
      title: 'Disease Warning',
      time: '12 hours ago',
      color: 'text-orange-500 bg-orange-50',
    },
  ];

  return (
    <div className="w-80 border-l border-gray-100 bg-white fixed right-0 top-0 h-screen overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 sticky top-0 bg-white">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold">Notifications</h3>
          <Bell className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-4 space-y-4">
        {notifications.map((notif, idx) => {
          const Icon = notif.icon;
          return (
            <div key={idx} className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${notif.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{notif.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationsPanel;

