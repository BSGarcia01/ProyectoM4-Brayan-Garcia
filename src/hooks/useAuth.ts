import { createContext, useContext } from "react";
import type { ContextoAuth } from "../types/Auth";

export const AuthContext = createContext<ContextoAuth | null>(null);

export function useAuth(): ContextoAuth {
  const contexto = useContext(AuthContext);
  if (contexto === null) {
    throw new Error("useAuth debe usarse dentro de Authenticator");
  }
  return contexto;
}