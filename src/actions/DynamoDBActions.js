export const DYNAMODB_CREATE = "DYNAMODB:CREATE";
export const DYNAMODB_READ = "DYNAMODB:READ";
export const DYNAMODB_UPDATE = "DYNAMODB:UPDATE";
export const DYNAMODB_DELETE = "USER:LOGOUT";

import DynamoDBModule from "modules/DynamoDBModule";

export function dynamoDBCreate(action = {}) {
  return DynamoDBModule({
    type: DYNAMODB_CREATE,
    action
  });
}

export function dynamoDBRead(action = {}) {
  return DynamoDBModule({
    type: DYNAMODB_READ,
    action
  });
}

export function dynamoDBUpdate(action = {}) {
  return DynamoDBModule({
    type: DYNAMODB_UPDATE,
    action
  });
}

export function dynamoDBDelete(action = {}) {
  return DynamoDBModule({
    type: DYNAMODB_DELETE,
    action
  });
}
