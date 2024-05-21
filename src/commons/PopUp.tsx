import { CloseIcon } from "./CloseIcon";

interface PopUpOptions{
    message:string,
    handlePopUp:(message:string)=>void,
    handleNavigate:()=>void
}


export function PopUp({message,handlePopUp,handleNavigate=()=>{}}:PopUpOptions) {
  window.scrollTo(0, 0);


  return (

    <div className="popUp-container efectoReveal">
        <div className="closeIcon-container"><CloseIcon onClick={()=>{handlePopUp("")}}/></div>

        <h3>{message}</h3>
        <button onClick={()=>{if(message==="A continuación recibirá un email que le permitira validar su direccion de correo"){handleNavigate(),handlePopUp("")}else{handlePopUp("")}}}>Continuar</button>

    </div>
  
      
    
  );
}
