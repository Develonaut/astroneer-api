import API from "API";
import { S3GetSignUrl, S3getImages } from "actions/S3Actions";

export default class S3Controller extends API {
  handleRequest = async () => {
    const {
      action = null,
      fileName = null,
      fileType = null
    } = this.getRequestBody();
    const missingActionError = !action
      ? { action: "Missing 'action' parameter" }
      : {};

    if (!action) {
      return this.sendUnauthorized({
        message: "Unauthorized",
        payload: {
          errors: {
            ...missingActionError
          }
        }
      });
    }

    let payload = {};
    let message = "Unauthorized";
    switch (action) {
      case "getSignUrl":
        const missingFileNameError = !fileName
          ? { fileName: "Missing 'fileName' parameter" }
          : {};

        const missingFileTypeError = !fileType
          ? { fileType: "Missing 'fileType' parameter" }
          : {};

        if (!fileName || !fileType) {
          return this.sendUnauthorized({
            message: "Unauthorized",
            payload: {
              errors: {
                ...missingFileNameError,
                ...missingFileTypeError
              }
            }
          });
        }

        payload = await S3GetSignUrl({ fileName, fileType });
        message = "Authorized";
        break;
      case "getS3Images":
        payload = await S3getImages();
        message = "Authorized";
      default:
        break;
    }

    const response = {
      message,
      payload
    }

    return Object.keys(payload).length
      ? this.sendOk(response)
      : this.sendUnauthorized(response);
  }
}
