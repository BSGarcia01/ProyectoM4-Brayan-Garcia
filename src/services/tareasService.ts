import {addDoc,collection,deleteDoc,doc,
onSnapshot,query,updateDoc,where,} from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";
import { db } from "./firebase";
import type { NuevaTarea, Tarea } from "../types/Tarea";

const COLECCION = "tareas";

const aTarea = (id: string, datos: DocumentData): Tarea => ({
  id,
  titulo: String(datos.titulo ?? ""),
  descripcion: String(datos.descripcion ?? ""),
  completada: Boolean(datos.completada),
  userId: String(datos.userId ?? ""),
});

export async function crearTarea(datos: NuevaTarea, userId: string): Promise<void> {
  await addDoc(collection(db, COLECCION), {
    titulo: datos.titulo,
    descripcion: datos.descripcion,
    completada: false,
    userId,
  });
}

export async function actualizarTarea(
  id: string,
  cambios: Partial<Omit<Tarea, "id" | "userId">>
): Promise<void> {
  await updateDoc(doc(db, COLECCION, id), cambios);
}

export async function eliminarTarea(id: string): Promise<void> {
  await deleteDoc(doc(db, COLECCION, id));
}

export function escucharTareas(
  userId: string,
  alCambiar: (tareas: Tarea[]) => void,
  alFallar: (error: unknown) => void
): () => void {
  const consulta = query(collection(db, COLECCION), where("userId", "==", userId));
  return onSnapshot(
    consulta,
    (resultado) => alCambiar(resultado.docs.map((d) => aTarea(d.id, d.data()))),
    alFallar
  );
}