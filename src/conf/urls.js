import pathToRegexp, { parse, compile } from "path-to-regexp";
import urljoin from "url-join";
import queryString from "query-string";

export function getAPIVersion() {
  return "v1";
}

export function getAPIUrlPrefix() {
  return `/api/${getAPIVersion()}`;
}

export function getAPIUrls() {
  return {
    HEALTH: `${getAPIUrlPrefix()}/health/:action`,
    AUTH: `${getAPIUrlPrefix()}/auth`,
    S3: `${getAPIUrlPrefix()}/s3`,
    AD_UNITS: `${getAPIUrlPrefix()}/adUnits/:action`,
    ADVERTISERS: `${getAPIUrlPrefix()}/advertisers/:action`,
    CAMPAIGNS: `${getAPIUrlPrefix()}/campaigns/:action`,
    NOTIFICATIONS: `${getAPIUrlPrefix()}/notifications/:action`
  };
}

export function getUrl(
  url = "",
  pathArgs = {},
  queryParams = {},
  encode = false
) {
  const compiledUrl = compile(url)(pathArgs);
  const serializedParams = serialize(queryParams, { encode });
  const delimeter = url.includes("?") ? "&" : "?";
  return serializedParams
    ? urljoin(`${compiledUrl}${delimeter}${serializedParams}`)
    : urljoin(compiledUrl);
}

export function matchRouteUrl(url = undefined) {
  if (!url) return undefined;
  return (
    Object.values(getAPIUrls()).find(path => {
      const { regEx } = parseUrl(path);
      return regEx.exec(url);
    }) || undefined
  );
}

export function getUrlArgs(pathname = "") {
  const path = pruneIllegalUrlCharacters(pathname);
  const matchedPath = matchRouteUrl(path);
  let urlArgs = {};
  if (matchedPath) {
    const { regEx, params } = parseUrl(matchedPath);
    const parsedRoute = regEx.exec(path);
    urlArgs = params.reduce((_params, { name: paramName }, idx) => {
      if (idx === 0) return _params;
      return {
        ..._params,
        [paramName]: parsedRoute[idx]
      };
    }, {});
  }

  return urlArgs;
}

export function parseUrl(url) {
  return {
    regEx: pathToRegexp(url),
    params: parse(url)
  };
}

export function pruneIllegalUrlCharacters(string = "") {
  const invalidRouteChars = /(index|.html)/g;
  return string.replace(invalidRouteChars, "");
}

// Make a payload url friendly and filter our bad object values.
export function serialize(obj, options = {}) {
  // eslint-disable-next-line
  Object.keys(obj).forEach(
    key => (!obj[key] || obj[key] === "undefined") && delete obj[key]
  );
  return Object.keys(obj).length
    ? queryString.stringify(obj, options)
    : undefined;
}

// Turn a query string into an Object
export function parseQueryParams(_queryString = "") {
  return queryString.parse(_queryString);
}
