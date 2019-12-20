export const NOTIFICATION_CREATE = "NOTIFICATION:CREATE";
export const NOTIFICATION_UPDATE = "NOTIFICATION:UPDATE";
export const NOTIFICATIONS_FETCH = "NOTIFICATIONS:FETCH";
export const NOTIFICATION_DELETE = "NOTIFICATIONS:DELETE";

import NotificationsModule from "modules/NotificationsModule";

export function deleteNotification(delta) {
  return NotificationsModule({
    type: NOTIFICATION_DELETE,
    delta
  });
}

export function createNotification(delta) {
  return NotificationsModule({
    type: NOTIFICATION_CREATE,
    delta
  });
}

export function updateNotification(delta) {
  return NotificationsModule({
    type: NOTIFICATION_UPDATE,
    delta
  });
}

export function fetchNotifications(delta) {
  return NotificationsModule({
    type: NOTIFICATIONS_FETCH,
    delta
  });
}
