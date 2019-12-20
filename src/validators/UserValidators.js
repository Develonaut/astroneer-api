import * as yup from "yup";

export async function validateUserCredentials({
  passWord: userPassWord,
  email: userEmail
}) {
  const { email, passWord } = this.getRequestBody();

  const passWordRegEx = new RegExp(userPassWord);
  const emailRegEx = new RegExp(userEmail);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required.")
      .matches(emailRegEx, "Wrong Email"),
    passWord: yup
      .string()
      .required("Password is required.")
      .matches(passWordRegEx, "Wrong Password")
  });

  return validationSchema
    .validate({ email, passWord })
    .then(() => {
      return {
        message: "Authorized",
        isValid: true
      };
    })
    .catch(errors => {
      const { message, path } = errors;
      return {
        message: "Unauthorized",
        errors: {
          [path]: message
        },
        isValid: false
      };
    });
}
