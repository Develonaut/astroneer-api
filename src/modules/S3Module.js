import { S3_GET_SIGN_URL, S3_GET_IMAGES } from "actions/S3Actions";

import { getS3SignUrl, getS3Images } from "middleware/S3Middleware";

function S3Module(action) {
  switch (action.type) {
    case S3_GET_SIGN_URL:
      return getS3SignUrl(action);
    case S3_GET_IMAGES:
      return getS3Images(action);
    default:
      return null;
  }
}

export default S3Module;
