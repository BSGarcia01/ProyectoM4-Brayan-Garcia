
import type { DatosLogin, ErroresLogin } from "../types/Auth";
import { useState } from "react";
import { obtenerMensajeAuth } from "../services/authErrors";



interface LoginFormProps {
  onSubmit: (datos: DatosLogin) => Promise<void>;
  textoBoton?: string;
}


const validar = (datos: DatosLogin): ErroresLogin => {
  const errores: ErroresLogin = {};

  if (datos.correo.trim() === "") {
  errores.correo = "El correo es obligatorio";
    } else if (!datos.correo.includes("@")) {
    errores.correo = "El correo debe incluir @";
    }

  if (datos.clave.length < 7) {
    errores.clave = "La contraseña debe ser minimo 7 caracteres";
  }

  return errores;
};

export function LoginForm ({onSubmit, textoBoton = "Entrar"}:LoginFormProps){
    const [form,setForm] = useState<DatosLogin>({correo: "", clave:""})

    const [cargando, setCargando] = useState(false);

    const [error, setError] = useState("");

    const [errores, setErrores] = useState<ErroresLogin>({});

const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};



const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const erroresEncontrados = validar(form);
  setErrores(erroresEncontrados);

if (Object.keys(erroresEncontrados).length > 0) {
return;
}
  setError("");
  setCargando(true);
  try {
    await onSubmit(form);
  } catch (fallo){
    setError(obtenerMensajeAuth(fallo));
  } finally {
    setCargando(false);
  }
};
return(
      
    <form onSubmit={manejarEnvio} noValidate>
        <label htmlFor="correo">Correo</label>
            <input
            id="correo"
            name="correo"
            type="email"
            value={form.correo}
            onChange={manejarCambio}
            autoComplete="email" />
            {errores.correo && <p role="alert">{errores.correo}</p>}

        <label htmlFor="clave">Contraseña</label>
            <input
            id="clave"
            name="clave"
            type="password"
            value={form.clave}
            onChange={manejarCambio}
            autoComplete="current-password" />
            {errores.clave && <p role="alert">{errores.clave}</p>}

            <button type="submit" disabled={cargando}>
            {cargando ? "Enviando..." : textoBoton} </button>

            {error && <p role="alert">{error}</p>}
            

    </form>);
}
  



