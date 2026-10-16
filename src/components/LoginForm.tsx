
import type { DatosLogin } from "../types/Auth";
import { useState } from "react";

interface LoginFormProps {
  onSubmit: (datos: DatosLogin) => Promise<void>;
}

export function LoginForm ({onSubmit}:LoginFormProps){
    const [form,setForm] = useState<DatosLogin>({correo: "", clave:""})

    const [cargando, setCargando] = useState(false);

    const [error, setError] = useState("");

const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError("");
  setCargando(true);
  try {
    await onSubmit(form);
  } catch {
    setError("Correo o contraseña incorrectos");
  } finally {
    setCargando(false);
  }
};
return(
    <form onSubmit={manejarEnvio}>
        <label htmlFor="correo">Correo</label>
            <input
            id="correo"
            name="correo"
            type="email"
            value={form.correo}
            onChange={manejarCambio}
            autoComplete="email" />

        <label htmlFor="clave">Contraseña</label>
            <input
            id="clave"
            name="clave"
            type="password"
            value={form.clave}
            onChange={manejarCambio}
            autoComplete="current-password" />

            <button type="submit" disabled={cargando}>
            {cargando ? "Entrando..." : "Entrar"} </button>

            {error && <p role="alert">{error}</p>}
            

    </form>);
}
  



