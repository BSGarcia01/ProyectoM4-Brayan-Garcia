import { auth } from "./firebase";
import type { Tarea } from "../types/Tarea";

export async function enviarResumen(tareas: Tarea[]): Promise<void> {
  const usuario = auth.currentUser;
  if (!usuario) throw new Error("Sin sesión");

  const token = await usuario.getIdToken();
  const respuesta = await fetch("/api/enviar-resumen", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      tareas: tareas.map((t) => ({ titulo: t.titulo, completada: t.completada })),
    }),
  });

  if (!respuesta.ok) throw new Error("Falló el envío");
}
