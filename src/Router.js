import { isValidRoute, getRouteConfig } from "./conf/routes";

import API from "API";

export default class Router extends API {
  routeRequest = () => {
    if (!isValidRoute(this.getRequestUrl())) {
      return this.sendBadRequest({
        message: `${this.getRequestUrl()} is not a valid endpoint`
      });
    }

    const { Controller } = getRouteConfig(this.getRequestUrl());
    return new Controller({
      response: this.state.response,
      request: this.state.request
    }).handleRequest();
  };
}
