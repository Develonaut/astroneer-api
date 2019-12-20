export default class API {
  constructor({ request, response }) {
    this.hydrated = false;
    this.state = {};
    // Getters
    this.getRequestUrl = this._getRequestUrl.bind(this);
    this.getRequestHeaders = this._getRequestHeaders.bind(this);
    this.getRequestBody = this._getRequestBody.bind(this);

    // Setters
    this.hydrate = this._hydrateState.bind(this);
    this.setState = this._setState.bind(this);

    // Reponse Methods
    this.sendOk = delta => this._sendSuccessResponse({ code: 200, delta });
    this.sendBadRequest = delta =>
      this._sendErrorResponse({ code: 400, delta });
    this.sendUnauthorized = delta =>
      this._sendErrorResponse({ code: 401, delta });
    this.sendServerError = delta =>
      this._sendErrorResponse({ code: 500, delta });

    this._hydrateState({ request, response });
  }

  // Hydrate is for the setting of request and response objects. It keeps the
  // API up to date with the most recent request.
  _hydrateState(delta) {
    const { request = undefined, response = undefined } = delta;
    return new Promise((resolve, reject) => {
      if (!request || !response)
        reject({
          message: "API State is missing required request or reponse data"
        });
      this.setState(delta, resolve);
    });
  }

  _setState(delta = {}, cb = () => {}) {
    this.state = {
      ...this.state,
      ...delta
    };
    cb();
  }

  _getRequestUrl() {
    const {
      request: { url }
    } = this.state;
    return url;
  }

  _getRequestHeaders() {
    const {
      request: { headers }
    } = this.state;
    return headers;
  }

  _getRequestBody() {
    const {
      request: { body }
    } = this.state;
    return body;
  }

  _sendSuccessResponse({
    code = undefined,
    delta: { message = undefined, payload = {} } = {}
  }) {
    if (!code || !message)
      return this.sendServerError({
        message: "Response is missing a code/message "
      });
    const { response } = this.state;
    // Must bind the response instance when calling send.
    response.status.call(response, code).json.call(response, {
      status: code,
      message,
      payload
    });
  }

  _sendErrorResponse({
    code = undefined,
    delta: { message = undefined, payload = {} } = {}
  }) {
    if (!code || !message)
      return this.sendServerError({
        message: "Response is missing a code/message "
      });
    const { response } = this.state;
    // Must bind the response instance when calling send.
    response.status.call(response, code).json.call(response, {
      status: code,
      message,
      payload
    });
  }
}
