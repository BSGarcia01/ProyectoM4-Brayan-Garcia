
import type { DatosLogin } from "../types/Auth";
import { useState } from "react";

interface LoginFormProps {
  onSubmit: (datos: DatosLogin) => Promise<void>;
}

export function LoginForm ({onSubmit}:LoginFormProps){
    const [form,setForm] = useState<DatosLogin>({correo: "", clave:""})

const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};
return(
    <form>
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

        
            

    </form>);
}
  



