import { Link } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";

export function PaginaLogin (){

    return(
        <div>
            <h1>Iniciar seccion</h1>
            <LoginForm onSubmit={async()=>{}}/>
        </div>
    )
}