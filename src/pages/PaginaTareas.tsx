import { FormularioTarea } from "../components/FormularioTarea";
import type { Tarea, NuevaTarea } from "../types/Tarea";
import { useState } from "react";
import { ListaTareas } from "../components/ListaTareas";


export function PaginaTareas(){

const [tareas, setTareas] = useState<Tarea[]>([]);

const eliminarTarea = (id : string) => {
    setTareas(tareas.filter((tarea)=>tarea.id !== id));
};

const completarTarea = (id: string) => {
  setTareas(tareas.map((tarea) => tarea.id === id ? { ...tarea, completada: true } : tarea
    )
  );
};

const editarTarea = (id: string) => {
  console.log("Editar pendiente:", id);
};

const agregarTarea = (datos:NuevaTarea) =>{
  const nueva:Tarea={
    ...datos,
    id: crypto.randomUUID(),
    userId: "usuario-prueba",
    completada: false,
  }
  setTareas([...tareas,nueva]);

};

return(
    <div>
        <h1>Gestor de tareas</h1>
        <FormularioTarea onAgregar={agregarTarea}/>
        <ListaTareas tareas={tareas} onCompletar={completarTarea} onEditar={editarTarea} onEliminar={eliminarTarea}/>
        
    </div>
)
}