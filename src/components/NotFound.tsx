import { useNavigate } from "react-router-dom"

export function NotFound(){
    const navigate=useNavigate();

    const linkToHome=()=>{
        navigate("/")
    }

    return(
        <section className="not-found-container">
            <h2>404</h2>
            <h3>Not found</h3>
            <button onClick={linkToHome} className="btn-volver-home">Volver al home</button>

        </section>
    )
}