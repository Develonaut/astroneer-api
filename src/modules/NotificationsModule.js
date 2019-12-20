import {
  NOTIFICATION_CREATE,
  NOTIFICATION_UPDATE,
  NOTIFICATION_DELETE,
  NOTIFICATIONS_FETCH
} from "actions/NotificationsActions";
import {
  createNotification,
  fetchNotifications,
  updateNotification,
  deleteNotification
} from "middleware/NotificationsMiddleware";

function NotificationsModule(action) {
  switch (action.type) {
    case NOTIFICATION_DELETE:
      return deleteNotification(action.delta);
    case NOTIFICATION_CREATE:
      return createNotification(action.delta);
    case NOTIFICATION_UPDATE:
      return updateNotification(action.delta);
    case NOTIFICATIONS_FETCH:
      return fetchNotifications(action.delta);
    default:
      return null;
  }
}

export default NotificationsModule;
