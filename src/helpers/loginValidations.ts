import { regularExpresions } from "../config/regularExpressions";

export interface UserValidationErrors{
    [key: string]: string
}

export class LoginValidations {
  private constructor(
       readonly email: string,
    readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [UserValidationErrors[]?, LoginValidations?] {
    const { email, password } = object;

    const errors: UserValidationErrors[] = [];

  
    //email
    if (!email) {
      errors.push({
        email: "Missing email",
      });
    }
    if (!regularExpresions.email.test(email)) {
      errors.push({ email: "Email is not valid" });
    }
    //password
    if (!password) {
      errors.push({
        password: "Missing password",
      });
    }
    if (!regularExpresions.contain_special_character.test(password)) {
      errors.push({
        password: "Password must contain at least one special character",
      });
    }
    if (!regularExpresions.contain_letter.test(password)) {
      errors.push({
        password: "Password must contain at least one lowercase letter",
      });
    }
    if (!regularExpresions.contain_Capital_leter.test(password)) {
      errors.push({
        password: "Password must contain at least one capital letter",
      });
    }
    if (!regularExpresions.contain_number.test(password)) {
      errors.push({ password: "Password must contain at least one number" });
    }
    if (password.length < 6) {
      errors.push({ password: "Password is too short" });
    }

    if (errors.length > 0) {
      return [errors, undefined];
    }

    return [undefined, new LoginValidations( email, password)];
  }
}
