import shortid from "shortid";
import {
  dynamoDBRead,
  dynamoDBCreate,
  dynamoDBUpdate,
  dynamoDBDelete
} from "actions/DynamoDBActions";

const TableName = "Notifications";

export async function deleteNotification({
  notificationId = undefined,
  implementation = undefined
}) {
  if (!notificationId || !implementation)
    throw new Error("Missing required properties");
  try {
    await dynamoDBDelete({
      TableName,
      Key: {
        notificationId,
        implementation
      },
      ConditionExpression: "notificationId = :val",
      ExpressionAttributeValues: {
        ":val": notificationId
      }
    });

    return {
      message: "Notification successfully deleted",
      payload: {
        notificationId,
        implementation
      }
    };
  } catch (error) {
    throw new Error(error);
  }
}

export async function createNotification({
  implementation = undefined,
  ...delta
}) {
  if (!implementation) throw new Error("Missing required properties");
  try {
    const Item = await dynamoDBCreate({
      TableName,
      Item: {
        ...delta,
        implementation,
        notificationId: shortid.generate()
      }
    });

    return {
      message: "Notification successfully created",
      payload: Item
    };
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateNotification({
  notificationId = undefined,
  implementation = undefined,
  ...delta
}) {
  if (!notificationId || !implementation)
    throw new Error("Missing required properties");
  try {
    const Key = {
      notificationId,
      implementation
    };
    const UpdateExpression = [];
    const ExpressionAttributeNames = {};
    const ExpressionAttributeValues = {};

    for (const key in delta) {
      if (delta.hasOwnProperty(key)) {
        const value = delta[key];
        const attributeValue = `:${key}`;
        const attributeName = `#${key}`;
        ExpressionAttributeNames[attributeName] = key;
        ExpressionAttributeValues[attributeValue] = value;
        UpdateExpression.push(`${attributeName} = ${attributeValue}`);
      }
    }

    await dynamoDBUpdate({
      TableName,
      Key,
      UpdateExpression: `set ${UpdateExpression.join(", ")}`,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
      ReturnValues: "UPDATED_NEW"
    });

    return {
      message: "Notification successfully updated",
      payload: { notificationId, implementation, ...delta }
    };
  } catch (error) {
    throw new Error(error);
  }
}

export async function fetchNotifications({ implementation = undefined }) {
  try {
    const filterExpression = implementation
      ? {
          FilterExpression: "#imp = :implementation",
          ExpressionAttributeNames: {
            "#imp": "implementation"
          },
          ExpressionAttributeValues: {
            ":implementation": implementation
          }
        }
      : {};

    const { Items = [] } = await dynamoDBRead({
      queryType: "scan",
      TableName,
      ...filterExpression
    });
    return {
      payload: Items
    };
  } catch (error) {
    throw new Error(error);
  }
}
