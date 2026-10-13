import { useState } from "react";
import type { NuevaTarea, Tarea } from "../types/Tarea";

interface FormularioTareaProps {
  onAgregar: (datos: NuevaTarea) => void;
  onGuardar: (id:string,datos: NuevaTarea) => void;
  tareaEnEdicion : Tarea | null;
}

export function FormularioTarea({ onAgregar, onGuardar, tareaEnEdicion }: FormularioTareaProps) {
  const [titulo, setTitulo] = useState(tareaEnEdicion ? tareaEnEdicion.titulo : "");

  const [descripcion, setDescripcion] = useState(tareaEnEdicion ? tareaEnEdicion.descripcion : "");

  const [error, setError] = useState("");

  

  const manejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (titulo.trim() === "") {
    setError("Titulo es obligatorio");
    return;
  }

  setError("");

  if (tareaEnEdicion) {
    onGuardar(tareaEnEdicion.id, { titulo, descripcion });
  } else {
    onAgregar({ titulo, descripcion });
    setTitulo("");
    setDescripcion("");
  }
};

  return (
    <form onSubmit={manejarEnvio}>
      <input
        placeholder="Titulo"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <input
        placeholder="Descripcion"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <button type="submit">{tareaEnEdicion ? "Guardar" : "Agregar"}</button>
      


      

      {error && <p>{error}</p>}
    </form>
  );
}
