import { Logo } from "../commons/Logo"
import { LoginIcon } from "../commons/Login.Icon"
import { useContext } from "react"
import { ModalContext } from "../context/modalContext"
import { UserContext } from "../context/userContext"
import { useNavigate } from "react-router-dom"


export function Navbar(){
const navigate=useNavigate()

  const {menuOpen,togleMenu}=useContext(ModalContext)
  const {email,name,setEmail,setId,setToken}=useContext(UserContext)

  const handleLogout=()=>{
    localStorage.removeItem('userData');
    setEmail("")
    setId("")
    setToken("")
    navigate("/")
  }

  const linkToMyCupons=()=>{
    navigate("/my-cupons")
  }

  const linkToHome=()=>{
      navigate("/")
  }

  

    return(
      <nav className="navbar-container">
        <Logo onClick={linkToHome}/>
     
        {!email ?<div onClick={togleMenu} className="navbar-login-container">
        <p>Login</p>
        <LoginIcon />
        </div>:
        <div className="auxiliar-container">
          <p onClick={linkToMyCupons}>{`MIS CUPONES (${name})`}</p>
        <div onClick={handleLogout} className="navbar-login-container">
        <p>Logout</p>
        <LoginIcon />
        </div>
        </div>}
       

      </nav>
    )
}