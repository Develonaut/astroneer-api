import AWS from "aws-sdk";
import { S3Credentials, S3Bucket, CDNUrl } from "../../config";
import Parse from "url-parse";

AWS.config.update({
  ...S3Credentials
});

const S3 = new AWS.S3();
const uploadPrefix = "uploads/";

export async function getS3SignUrl({
  action: { fileName = null, fileType = null }
}) {
  return new Promise((resolve, reject) => {
    if (!fileName || !fileType) reject(new Error("Missing Filename/Filetype"));
    const params = {
      Bucket: `${S3Bucket}/${uploadPrefix.replace("/", "")}`,
      Key: fileName,
      Expires: 60,
      ContentType: fileType
    };

    S3.getSignedUrl("putObject", params, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
}

async function getImageData({ Key, LastModified }) {
  return new Promise((resolve, reject) => {
    S3.getSignedUrl("getObject", { Bucket: S3Bucket, Key }, (err, url) => {
      if (err) reject(err);
      const { pathname } = Parse(url);
      resolve({
        url: `${CDNUrl}${pathname.replace(`/${S3Bucket}`, "")}`,
        lastModified: LastModified
      });
    });
  });
}

export async function getS3Images() {
  const { Contents } = await S3.listObjectsV2({
    Bucket: S3Bucket,
    Prefix: uploadPrefix
  }).promise();
  const filteredContents = Contents.filter(item => item.Key !== uploadPrefix);
  return Promise.all(filteredContents.map(content => getImageData(content)))
    .then(data => data)
    .catch(err => {
      throw new Error(err);
    });
}
