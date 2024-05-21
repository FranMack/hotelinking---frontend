import { regularExpresions } from "../config/regularExpressions";

export interface UserValidationErrors{
    [key: string]: string
}

export class RegisterValidation {
  private constructor(
    readonly name: string,
    readonly lastname: string,
    readonly email: string,
    readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [UserValidationErrors[]?, RegisterValidation?] {
    const { name, email, password, lastname } = object;

    const errors: UserValidationErrors[] = [];

    //name
    if (!name) {
      errors.push({
        name: "Missing name",
      });
    }
    if (!regularExpresions.only_letters.test(name)) {
      errors.push({ name: "Name should contain letters and spaces" });
    }
    //lastname
    if (!lastname) {
      errors.push({
        lastname: "Missing lastname",
      });
    }
    if (!regularExpresions.only_letters.test(lastname)) {
      errors.push({ lastname: "Name should contain letters and spaces" });
    }
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

    return [undefined, new RegisterValidation(name, lastname, email, password)];
  }
}
