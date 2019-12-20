import API from "API";
import { getUrlArgs } from "conf/urls";

import { fetchCampaigns, createCampaign, updateCampaign } from "actions/CampaignsActions";

export default class CampaignsController extends API {
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
          payload = await fetchCampaigns();
        } catch (err) {
          return this.sendServerError({
            message: `${err}`,
          });
        }
        break;
        case "create":
        try {
          payload = await createCampaign(data); 
        } catch (err) {
          return this.sendServerError({
            message: `${err}`,
          });
        }
        break;
      case "update":
        try {
          payload = await updateCampaign(data);
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


