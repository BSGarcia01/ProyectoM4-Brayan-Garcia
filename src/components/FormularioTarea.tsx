import { useState } from "react";
import type { NuevaTarea } from "../types/Tarea";

interface FormularioTareaProps {
  onAgregar: (datos: NuevaTarea) => void;
}

export function FormularioTarea({ onAgregar }: FormularioTareaProps) {
  const [titulo, setTitulo] = useState("");

  const [descripcion, setDescripcion] = useState("");

  const [error, setError] = useState("");

  const manejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (titulo.trim() === "") {
      setError("Titulo es obligatorio");
      return;
    }
    setError("");
    onAgregar({ titulo, descripcion });
    setTitulo("");
    setDescripcion("");
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

      <button type="submit">Agregar</button>

      {error && <p>{error}</p>}
    </form>
  );
}
