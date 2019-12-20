import API from "API";
import { dynamoDBRead } from "actions/DynamoDBActions";
import { validateUserCredentials } from "validators/UserValidators";

export default class AuthController extends API {
  handleRequest = async () => {
    const { email = null, passWord = null } = this.getRequestBody();
    const missingEmailError = !email
      ? { email: "Missing 'email' parameter" }
      : {};
    const missingPasswordError = !passWord
      ? { passWord: "Missing 'passWord' parameter" }
      : {};

    if (!email || !passWord) {
      return this.sendUnauthorized({
        message: "Unauthorized",
        payload: {
          errors: {
            ...missingEmailError,
            ...missingPasswordError
          }
        }
      });
    }

    const { Item: userData = null } = await dynamoDBRead({
      TableName: "UsersEmailTable",
      Key: { email }
    });

    if (!userData)
      return this.sendUnauthorized({
        message: "Unauthorized",
        payload: {
          errors: {
            email: "No Account Found"
          }
        }
      });
    const { isValid, message, errors = {} } = await validateUserCredentials.call(this, userData);
    const response = {
      message,
      payload: isValid ? { ...userData } : { errors }
    };

    return isValid ? this.sendOk(response) : this.sendUnauthorized(response);
  }
}
