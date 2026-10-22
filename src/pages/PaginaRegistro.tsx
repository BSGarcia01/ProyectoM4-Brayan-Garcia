import { Link, useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";
import type { DatosLogin } from "../types/Auth";

export function PaginaRegistro() {
  const { registrar } = useAuth();
  const navegar = useNavigate();

  const manejarRegistro = async (datos: DatosLogin): Promise<void> => {
    await registrar(datos.correo, datos.clave);
    navegar("/tareas", { replace: true });
  };

  return (
    <div>
      <h1>Crear cuenta</h1>
      <LoginForm onSubmit={manejarRegistro} textoBoton="Registrarme" />
      <p>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
}