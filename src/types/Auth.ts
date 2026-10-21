import type { User } from "firebase/auth";

export interface DatosLogin {
  correo:string;
  clave: string;
}

export interface ErroresLogin{
    correo? : string;
    clave?: string;
}

export interface ContextoAuth {
  usuario: User | null;
  cargando: boolean;
  entrar: (correo: string, clave: string) => Promise<void>;
  registrar: (correo: string, clave: string) => Promise<void>;
  salir: () => Promise<void>;
}