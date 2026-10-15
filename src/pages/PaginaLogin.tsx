import { Link } from "react-router-dom";


export function PaginaLogin (){

    return(
        <div>
            <h1>Prueba de Ingreso</h1>
            <p>Esto sera una prueba nada mas</p>
            <Link to="/tareas">Tareas</Link>
        </div>
    )
}