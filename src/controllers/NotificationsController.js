import API from "API";
import { getUrlArgs } from "conf/urls";
import {
  createNotification,
  updateNotification,
  deleteNotification,
  fetchNotifications
} from "actions/NotificationsActions";

export default class NotificationsController extends API {
  handleRequest = async () => {
    const data = this.getRequestBody();
    const { action = null } = getUrlArgs(this.getRequestUrl());
    if (!action) {
      return this.sendUnauthorized({
        message: "Unauthorized",
        payload: {
          errors: {
            action: "Missing 'action' parameter"
          }
        }
      });
    }

    const methods = {
      create: createNotification,
      delete: deleteNotification,
      update: updateNotification,
      get: fetchNotifications
    };

    if (!methods[action])
      return this.sendUnauthorized({
        message: `${action} is not a valid action`
      });

    try {
      const { message = "Authorized", payload } = await methods[action](data);
      return this.sendOk({
        message,
        payload
      });
    } catch (error) {
      return this.sendServerError({
        message: `${error}`
      });
    }
  };
}
