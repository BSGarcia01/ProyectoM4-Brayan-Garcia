import { Link } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";

export function PaginaLogin (){

    return(
        <div>
            <h1>Prueba de Ingreso</h1>
            <p>Esto sera una prueba nada mas</p>
            <LoginForm onSubmit={async()=>{}}/>
            <Link to="/tareas">Tareas</Link>
        </div>
    )
}