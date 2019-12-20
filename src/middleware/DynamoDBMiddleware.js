import AWS from "aws-sdk";
import { DynamoDBCredentials } from "../../config";
AWS.config.update({
  ...DynamoDBCredentials
});

const docClient = new AWS.DynamoDB.DocumentClient();

function handleReadPromise(error, data) {
  if (error) this.reject(error);
  this.resolve(data);
}

export function dynamoDBCreate({
  action: { queryType = "put", ...restAction }
} = {}) {
  try {
    return new Promise((resolve, reject) => {
      docClient[queryType](restAction, error => {
        if (error) reject(error);
        resolve(restAction.Item);
      });
    });
  } catch (error) {
    throw new Error(error);
  }
}

export function dynamoDBRead({
  action: { queryType = "get", ...restAction }
} = {}) {
  return new Promise((resolve, reject) => {
    docClient[queryType](
      restAction,
      handleReadPromise.bind({ resolve, reject })
    );
  });
}

export function dynamoDBUpdate({
  action: { queryType = "update", ...restAction }
} = {}) {
  try {
    return new Promise((resolve, reject) => {
      docClient[queryType](
        restAction,
        handleReadPromise.bind({ resolve, reject })
      );
    });
  } catch (error) {
    throw new Error(error);
  }
}

export function dynamoDBDelete({
  action: { queryType = "delete", ...restAction }
} = {}) {
  try {
    return new Promise((resolve, reject) => {
      docClient[queryType](
        restAction,
        handleReadPromise.bind({ resolve, reject })
      );
    });
  } catch (error) {
    throw new Error(error);
  }
}
