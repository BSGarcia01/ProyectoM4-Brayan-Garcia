import type { Tarea } from "../types/Tarea";
import { TarjetaTarea } from "./TarjetaTarea";

interface ListaTareasProps {
  tareas: Tarea[];                     
  onEliminar: (id: string) => void;
  onEditar: (id: string) => void;
  onCompletar: (id: string) => void;
}

export function ListaTareas({tareas, onEliminar, onEditar, onCompletar }: ListaTareasProps){
    return(
        <div>
            {tareas.map((tarea)=>(<TarjetaTarea 
            key={tarea.id} tarea= {tarea} onCompletar={onCompletar} onEditar={onEditar} onEliminar={onEliminar}/>))}
        </div>
    )
}



