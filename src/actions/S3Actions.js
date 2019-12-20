export const S3_GET_SIGN_URL = "S3:GET:SIGN:URL";
export const S3_GET_IMAGES = "S3:GET:IMAGES";
export const S3_UPLOAD = "S3:UPLOAD";

import S3Module from "modules/S3Module";

export function S3GetSignUrl(action = {}) {
  return S3Module({
    type: S3_GET_SIGN_URL,
    action
  });
}

export function S3getImages(action = {}) {
  return S3Module({
    type: S3_GET_IMAGES,
    action
  });
}
