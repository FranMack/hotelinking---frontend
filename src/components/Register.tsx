import { useRef, useEffect, useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { RegisterValidation } from "../helpers/registerValidations";
import axios from "axios";
import { CloseIcon } from "../commons/CloseIcon";
import { ModalRegisterContext } from "../context/modalRegistarContext";
import { ModalContext } from "../context/modalContext";


interface RegisterOptions{
  message:string,
  handlePopUp:(message:string)=>void,
}

export function Register({message,handlePopUp}:RegisterOptions) {


  const navigatge = useNavigate();

  const {togleRegisterMenu}=useContext(ModalRegisterContext)
  const {togleMenu}=useContext(ModalContext)

  const linkToLogin = () => {
    togleRegisterMenu()
    togleMenu()
  };

 
  const initialForm = {
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { formState, onInputChange, onResetForm } = useForm(initialForm);
  const { name, lastname, email, password, confirmPassword } = formState;


  //validation erros
  const [nameErrors, setNameErrors] = useState<string[]>([]);
  const [lastNameErrors, setLastnameErrors] = useState<string[]>([]);
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);

    //other errors
  const [errors,setErrors]=useState<string>("")

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const [errors, dataValidation] = RegisterValidation.create({
      name: name,
      lastname: lastname,
      email: email,
      password: password,
    });

    if (errors) {
      errors.map((error) => {
        if (Object.keys(error).includes("name")) {
          return setNameErrors((prevErrors) => [...prevErrors, error["name"]]);
        }
        if (Object.keys(error).includes("lastname")) {
          return setLastnameErrors((prevErrors) => [
            ...prevErrors,
            error["lastname"],
          ]);
        }
        if (Object.keys(error).includes("email")) {
          return setEmailErrors((prevErrors) => [
            ...prevErrors,
            error["email"],
          ]);
        }
        if (Object.keys(error).includes("password")) {
          return setPasswordErrors((prevErrors) => [
            ...prevErrors,
            error["password"],
          ]);
        }
      });

      !errors.find((error) => {
        return Object.keys(error).includes("name");
      }) && setNameErrors([]);
      !errors.find((error) => {
        return Object.keys(error).includes("lastname");
      }) && setLastnameErrors([]);
      !errors.find((error) => {
        return Object.keys(error).includes("email");
      }) && setEmailErrors([]);
      !errors.find((error) => {
        return Object.keys(error).includes("password");
      }) && setPasswordErrors([]);

      if (formState.password !== formState.confirmPassword) {
        setConfirmPasswordError(true);
      }

      return;
    }
    
    if (formState.password !== formState.confirmPassword) {
      setConfirmPasswordError(true);

      return
    }
    axios
      .post("http://localhost:3000/api/auth/register", {
        name: name,
        lastname: lastname,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        onResetForm();
        handlePopUp(message)
        togleRegisterMenu()
      })
      .catch((error) => {
        console.log(error);
      
        

        
      });
  };

  const handleBlur = (field: string) => {
    const [errors] = RegisterValidation.create(formState);
    const fieldError = errors?.find((error) =>
      Object.keys(error).includes(field)
    );
    switch (field) {
      case "name":
        setNameErrors(fieldError ? [fieldError[field]] : []);
        break;
      case "lastname":
        setLastnameErrors(fieldError ? [fieldError[field]] : []);
        break;
      case "email":
        setEmailErrors(fieldError ? [fieldError[field]] : []);
        break;
      case "password":
        setPasswordErrors(fieldError ? [fieldError[field]] : []);
        break;
      default:
        break;
    }
  };

  return (
  
     
      <form onSubmit={handleSubmit} className="login-form" action="">
        <div className="closeIcon-container"><CloseIcon onClick={togleRegisterMenu}/></div>
        <h3>Crea tu cuenta</h3>
        <h6>Ingresa tus datos para registrarte.</h6>
        <input
          value={name}
          onChange={onInputChange}
          onBlur={() => handleBlur("name")}
          name="name"
          type="text"
          placeholder="Nombre"
          className={`${(nameErrors.length > 0 || errors) && "input-error"}`}
        />
        {nameErrors.length > 0 && (
          <span className="input-helpers-error">{nameErrors[0]}</span>
        )}
        <input
          value={lastname}
          onChange={onInputChange}
          onBlur={() => handleBlur("lastname")}
          name="lastname"
          type="text"
          placeholder="Apellido"
          className={`${(lastNameErrors.length > 0 || errors) && "input-error"}`}
        />
        {lastNameErrors.length > 0 && (
          <span className="input-helpers-error">{lastNameErrors[0]}</span>
        )}
        <input
          value={email}
          onChange={onInputChange}
          onBlur={() => handleBlur("email")}
          name="email"
          type="email"
          placeholder="Dirección de correo electrónico"
          className={`${(emailErrors.length > 0 || errors) && "input-error"}`}
        />
        {emailErrors.length > 0 && (
          <span className="input-helpers-error">{emailErrors[0]}</span>
        )}
        <input
          value={password}
          onChange={onInputChange}
          onBlur={() => handleBlur("password")}
          name="password"
          type="password"
          placeholder="Contraseña"
          className={`${(passwordErrors.length > 0 || errors) && "input-error"}`}
        />
        {passwordErrors.length > 0 && (
          <span className="input-helpers-error">{passwordErrors[0]}</span>
        )}
        <input
          value={confirmPassword}
          onChange={onInputChange}
          name="confirmPassword"
          type="password"
          placeholder="Confirmar contraseña"
          className={`${(confirmPasswordError || errors) && "input-error"}`}
        />
        {confirmPasswordError && (
          <span className="input-helpers-error">
            {"Wrong confirm password"}
          </span>
        )}
        <div className="login-button-container">
         

          <p>
            ¿Ya tienes una cuenta?,{" "}
            <strong onClick={linkToLogin}>Haz click aquí.</strong>
          </p>
          {errors && (
          <span className="response-error">{errors}</span>
        )}
        </div>
        <button type="submit">REGISTRARSE</button>
      </form>

  );
}
