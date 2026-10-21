
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


interface RutaProtegidaProps {
  children: ReactNode;
}

export function RutaProtegida({ children }: RutaProtegidaProps) {
  const{usuario, cargando} = useAuth();

  if (cargando) {
    return <p>Cargando...</p>;
  }

  if (!usuario){
    return <Navigate to="/login" replace/>
  }

  return <>{children}</>;
}