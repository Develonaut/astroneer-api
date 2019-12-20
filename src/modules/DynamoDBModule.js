import {
  DYNAMODB_CREATE,
  DYNAMODB_READ,
  DYNAMODB_UPDATE,
  DYNAMODB_DELETE
} from "actions/DynamoDBActions";

import {
  dynamoDBCreate,
  dynamoDBRead,
  dynamoDBUpdate,
  dynamoDBDelete
} from "middleware/DynamoDBMiddleware";

function DynamoDBModule(action) {
  switch (action.type) {
    case DYNAMODB_CREATE:
      return dynamoDBCreate(action);
    case DYNAMODB_READ:
      return dynamoDBRead(action);
    case DYNAMODB_UPDATE:
      return dynamoDBUpdate(action);
    case DYNAMODB_DELETE:
      return dynamoDBDelete(action);
    default:
      return state;
  }
}

export default DynamoDBModule;
