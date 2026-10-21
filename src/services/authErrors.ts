

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
  "auth/invalid-credential": "Correo o contraseña incorrectos.",
  "auth/invalid-login-credentials": "Correo o contraseña incorrectos.",
  "auth/user-not-found": "Correo o contraseña incorrectos.",
  "auth/wrong-password": "Correo o contraseña incorrectos.",
  "auth/email-already-in-use": "Ese correo ya está registrado.",
  "auth/invalid-email": "El correo no es válido.",
  "auth/weak-password": "La contraseña es muy débil (mínimo 6 caracteres).",
  "auth/too-many-requests": "Demasiados intentos. Intenta más tarde.",
  "auth/network-request-failed": "No hay conexión. Revisa tu internet.",
};

