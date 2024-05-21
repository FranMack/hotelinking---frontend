import { regularExpresions } from "../config/regularExpressions";

export interface UserValidationErrors {
  [key: string]: string;
}

export class LoginValidations {
  private constructor(
    readonly email: string,
    readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [UserValidationErrors[]?, LoginValidations?] {
    const { email, password } = object;

    const errors: UserValidationErrors[] = [];

    // Validaciones del email
    if (!email) {
      errors.push({
        email: "Falta el correo electrónico",
      });
    }
    if (!regularExpresions.email.test(email)) {
      errors.push({ email: "El correo electrónico no es válido" });
    }

    // Validaciones de la contraseña
    if (!password) {
      errors.push({
        password: "Falta la contraseña",
      });
    }
    if (!regularExpresions.contain_special_character.test(password)) {
      errors.push({
        password: "La contraseña debe contener al menos un carácter especial",
      });
    }
    if (!regularExpresions.contain_letter.test(password)) {
      errors.push({
        password: "La contraseña debe contener al menos una letra minúscula",
      });
    }
    if (!regularExpresions.contain_Capital_leter.test(password)) {
      errors.push({
        password: "La contraseña debe contener al menos una letra mayúscula",
      });
    }
    if (!regularExpresions.contain_number.test(password)) {
      errors.push({ password: "La contraseña debe contener al menos un número" });
    }
    if (password.length < 6) {
      errors.push({ password: "La contraseña es demasiado corta" });
    }

    if (errors.length > 0) {
      return [errors, undefined];
    }

    return [undefined, new LoginValidations(email, password)];
  }
}
