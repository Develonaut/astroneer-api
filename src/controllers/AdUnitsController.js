import API from "API";
import {
  getUrlArgs
} from "conf/urls";

import {
  createAdUnit,
  updateAdUnit,
  fetchAdUnits,
  removeAdUnits,
  fetchAdUnitsPerformance
} from "actions/AdUnitsActions";

export default class AdUnitsController extends API {
  handleRequest = async () => {
    const data = this.getRequestBody();
    const {
      action = null
    } = getUrlArgs(this.getRequestUrl());

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

    let message = "Authorized";
    let payload = null;
    switch (action) {
      case "performance":
        try {
          payload = await fetchAdUnitsPerformance(data);
        } catch (err) {
          return this.sendServerError({
            message: `${err}`,
          });
        }
        break;
      case "remove":
        try {
          payload = await removeAdUnits(data);
        } catch (err) {
          return this.sendServerError({
            message: `${err}`,
          });
        }
        break;
      case "create":
        try {
          payload = await createAdUnit(data);
        } catch (err) {
          return this.sendServerError({
            message: `${err}`,
          });
        }
        break;
      case "update":
        try {
          payload = await updateAdUnit(data);
        } catch (err) {
          return this.sendServerError({
            message: `${err}`,
          });
        }
        break;
      case "get":
        try {
          payload = await fetchAdUnits();
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
    });
  }
}
