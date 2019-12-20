import API from "API";
import { getUrlArgs } from "conf/urls";

import { fetchAdvertisers, createAdvertiser, updateAdvertiser } from "actions/AdvertisersActions";

export default class AdvertisersController extends API {
  handleRequest = async () => {
    const data = this.getRequestBody();
    const { action = null } = getUrlArgs(this.getRequestUrl());
    if (!action) {
      return this.sendUnauthorized({
        message: "Unauthorized",
        payload: {
          errors: {
            action: "Missing 'action' parameter",
          }
        }
      });
    }

    let message = "Authorized";
    let payload = null;
    switch (action) {
      case "get":
        try {
          payload = await fetchAdvertisers();
        } catch (err) {
          return this.sendServerError({
            message: `${err}`,
          });
        }
        break;
        case "create":
        try {
          payload = await createAdvertiser(data); 
        } catch (err) {
          return this.sendServerError({
            message: `${err}`,
          });
        }
        break;
      case "update":
        try {
          payload = await updateAdvertiser(data);
        } catch (err) {
          return this.sendServerError({
            message: `${err}`,
          });
        }
        break;
      default:
        break;
    }

    return this.sendOk({
      message,
      payload,
    })
  }
}
