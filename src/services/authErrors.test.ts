import { describe, expect, it } from "vitest";
import { obtenerMensajeAuth } from "./authErrors";

describe("obtenerMensajeAuth", () => {
  it("traduce las credenciales incorrectas", () => {
    expect(obtenerMensajeAuth({ code: "auth/invalid-credential" })).toBe(
      "Correo o contraseña incorrectos."
    );
  });

  it("usa el mismo mensaje para usuario inexistente", () => {
    expect(obtenerMensajeAuth({ code: "auth/user-not-found" })).toBe(
      obtenerMensajeAuth({ code: "auth/invalid-credential" })
    );
  });

  it("traduce el correo ya registrado", () => {
    expect(obtenerMensajeAuth({ code: "auth/email-already-in-use" })).toBe(
      "Ese correo ya está registrado."
    );
  });

  it("devuelve el mensaje por defecto con un código desconocido", () => {
    expect(obtenerMensajeAuth({ code: "auth/inventado" })).toBe(
      "Error de autenticación. Intenta nuevamente."
    );
  });

  it("devuelve el mensaje por defecto si no es un error de Firebase", () => {
    expect(obtenerMensajeAuth("hola")).toBe("Error de autenticación. Intenta nuevamente.");
    expect(obtenerMensajeAuth(null)).toBe("Error de autenticación. Intenta nuevamente.");
  });
});