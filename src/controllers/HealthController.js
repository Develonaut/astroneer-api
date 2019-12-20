import API from "API";
import { getUrlArgs } from "conf/urls";

export default class HealthCheckController extends API {
  handleRequest = async () => {
    const { action = "check" } = getUrlArgs(this.getRequestUrl());

    let payload = null;
    switch (action) {
      case "check":
        payload = { msg: "Hello from Astroneer!" }
        break;
      default:
        break;
    }

    const response = {
      message: "Authorized",
      payload,
    }

    return this.sendOk(response)
  }
}
