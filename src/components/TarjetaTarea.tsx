import type { Tarea } from "../types/Tarea";

interface TarjetaTareaProps {
  tarea: Tarea;
  onEliminar: (id: string) => void;
  onEditar: (id: string) => void;
  onCompletar: (id: string) => void;
}

export function TarjetaTarea({ tarea, onEliminar, onEditar, onCompletar }: TarjetaTareaProps) {
  return (
    <div>
        <h3>{tarea.titulo}</h3>
        {tarea.completada ? <p>Tarea Completada</p> : <p>Pendiente</p>}
        <button onClick={()=> onEliminar(tarea.id)}>Eliminar</button>
        <button onClick={()=> onEditar(tarea.id)}>Editar</button>
        <button onClick={()=> onCompletar(tarea.id)}>Completar</button>
    </div>
  );
}