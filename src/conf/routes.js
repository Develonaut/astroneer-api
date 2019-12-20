import { getAPIUrls, matchRouteUrl } from "conf/urls.js";

import AuthController from "controllers/AuthController";
import S3Controller from "controllers/S3Controller";
import AdUnitsController from "controllers/AdUnitsController";
import AdvertisersController from "controllers/AdvertisersController";
import HealthController from "controllers/HealthController";
import CampaignsController from "controllers/CampaignsController";
import NotificationsController from "controllers/NotificationsController";

export function getAPIRoutes() {
  return [
    {
      name: "Health",
      path: getAPIUrls().HEALTH,
      exact: true,
      Controller: HealthController
    },
    {
      name: "Auth",
      path: getAPIUrls().AUTH,
      exact: true,
      Controller: AuthController
    },
    {
      name: "S3",
      path: getAPIUrls().S3,
      exact: true,
      Controller: S3Controller
    },
    {
      name: "AdUnits",
      path: getAPIUrls().AD_UNITS,
      Controller: AdUnitsController
    },
    {
      name: "Advertisers",
      path: getAPIUrls().ADVERTISERS,
      Controller: AdvertisersController
    },
    {
      name: "Campaigns",
      path: getAPIUrls().CAMPAIGNS,
      Controller: CampaignsController
    },
    {
      name: "Notifications",
      path: getAPIUrls().NOTIFICATIONS,
      Controller: NotificationsController
    }
  ];
}

export function getRouteBundles(blacklist = []) {
  const routes = [...getAPIRoutes()];

  const bundle = routes.reduce((_routes, route) => {
    // If the route isn't blacklisted, add it to the routeBundle.
    if (!blacklist.includes(route.path)) _routes.push(route);
    return _routes;
  }, []);
  return bundle;
}

export function getRouteConfig(url) {
  return getRouteBundles().filter(
    route => route.path === matchRouteUrl(url)
  )[0];
}

export function getValidatedRoute(url) {
  // Find a matching route for the pathname.
  const matchedUrl = matchRouteUrl(url);
  // return a built Url.
  return matchedUrl;
}

export function isValidRoute(url) {
  return getValidatedRoute(url);
}
