import { useRef, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { LoginValidations } from "../helpers/loginValidations";
import { CloseIcon } from "../commons/CloseIcon";
import axios from "axios";
import { ModalContext } from "../context/modalContext";
import { UserContext } from "../context/userContext";
import { ModalRegisterContext } from "../context/modalRegistarContext";



export function Login() {
  window.scrollTo(0, 0);


    const {menuOpen,togleMenu}=useContext(ModalContext)
    const {menuRegisterOpen,togleRegisterMenu}=useContext(ModalRegisterContext)
    const {setToken,setEmail,setId,setName}=useContext(UserContext)
 

  const navigatge = useNavigate();

  const linkToRegister = () => {
    togleMenu()
    togleRegisterMenu()
  };

  const initialForm = {
    email: "",
    password: "",
  };


  //validation errors
  const { formState, onInputChange, onResetForm } = useForm(initialForm);
  const { email, password } = formState;
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  //other errors
  const [errors,setErrors]=useState<string>("")
  

  const handleBlur = (field: string) => {
    const [errors] = LoginValidations.create(formState);
    const fieldError = errors?.find((error) =>
      Object.keys(error).includes(field)
    );
    switch (field) {
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

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const [errors, dataValidation] = LoginValidations.create({
      email: email,
      password: password,
    });

    if (errors) {
      errors.map((error) => {
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
        return Object.keys(error).includes("email");
      }) && setEmailErrors([]);
      !errors.find((error) => {
        return Object.keys(error).includes("password");
      }) && setPasswordErrors([]);

      return;
    }

    axios
      .post("http://localhost:3000/api/auth/login", {
        email: email,
        password: password,
      },{withCredentials:true})
      .then((response) => {
        localStorage.setItem('userData', JSON.stringify({ ...response.data}));
        setToken(response.data.token)
              setEmail(response.data.email)
        setId(response.data.id)
        setName(response.data.name)
        onResetForm();
        togleMenu()
      })
      
      .catch((error) => {
        setErrors(error.response.data.error)
        console.log(error);
      });
  };




  return (
  
      
      <form
        onSubmit={handleSubmit}
        className="login-form efectoReveal"
        action=""
      >
        <div className="closeIcon-container"><CloseIcon onClick={togleMenu}/></div>
        <h3>Mi cuenta</h3>
        <h6>Si ya estás registrado inicia sesión aquí:</h6>
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
        <div className="login-button-container">
          <p>
            Si aún no tienes una cuenta,{" "}
            <strong onClick={linkToRegister}>Haz click aquí.</strong>
          </p>
          {errors && (
          <span className="response-error">{errors}</span>
        )}
        </div>
        <button>INICIAR SESIÓN</button>
      </form>
  
  );
}
