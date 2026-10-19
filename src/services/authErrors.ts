

function leerCodigo(error: unknown): string | null {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
  ) {
    return error.code;
  }
  return null;
}

export function obtenerMensajeAuth(error: unknown): string {
  const codigo = leerCodigo(error);

  if (codigo === null) {
    return "Error de autenticación. Intenta nuevamente.";
  }

  return mensajes[codigo] ?? "Error de autenticación. Intenta nuevamente.";
}

const mensajes: Record<string, string> = {
  "auth/invalid-credential": "Correo o contraseña incorrectos."
};

