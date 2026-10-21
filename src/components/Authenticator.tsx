import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../services/firebase";
import { AuthContext } from "../hooks/useAuth";

export function Authenticator({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const dejarDeEscuchar = onAuthStateChanged(auth, (usuarioActual) => {
      setUsuario(usuarioActual);
      setCargando(false);
    });
    return () => dejarDeEscuchar();
  }, []);

  const entrar = async (correo: string, clave: string): Promise<void> => {
    await signInWithEmailAndPassword(auth, correo, clave);
  };

  const registrar = async (correo: string, clave: string): Promise<void> => {
    await createUserWithEmailAndPassword(auth, correo, clave);
  };

  const salir = async (): Promise<void> => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, entrar, registrar, salir }}>
      {children}
    </AuthContext.Provider>
  );
}