import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";
import type { DatosLogin } from "../types/Auth";
import { Link } from "react-router-dom";

export function PaginaLogin (){
    const { entrar } = useAuth();
    const navegar = useNavigate();

    const manejarLogin = async (datos: DatosLogin): Promise<void> => {
    await entrar(datos.correo, datos.clave);
    navegar("/tareas", { replace: true });
    };
    return(
        <div>
            <h1>Iniciar sesion</h1>
            <LoginForm onSubmit={manejarLogin}/>
            <p> ¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
        </div>
    )
}