import { FormularioTarea } from "../components/FormularioTarea";
import type { Tarea, NuevaTarea } from "../types/Tarea";
import { useState, useEffect} from "react";
import { ListaTareas } from "../components/ListaTareas";



export function PaginaTareas(){

const [tareas, setTareas] = useState<Tarea[]>([]);
const [tareaEnEdicion, setTareaEnEdicion] = useState<Tarea| null>(null);

 useEffect(() => {
  const pendientes = tareas.filter((tarea) => !tarea.completada).length;
  document.title = `Gestor de tareas (${pendientes} pendientes)`;
}, [tareas]);

const eliminarTarea = (id : string) => {
    setTareas(tareas.filter((tarea)=>tarea.id !== id));
};

const completarTarea = (id: string) => {
  setTareas(tareas.map((tarea) => tarea.id === id ? { ...tarea, completada: true } : tarea
    )
  );
};

const editarTarea = (id: string) => {
  const encontrada = tareas.find((tarea)=>tarea.id === id);
  if (encontrada){
    setTareaEnEdicion(encontrada)
  }
};

const guardarEdicion = (id: string, datos: NuevaTarea) => {
  setTareas(tareas.map((tarea) => tarea.id === id ? { ...tarea, ...datos } : tarea ));
  setTareaEnEdicion(null);
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
        
        <FormularioTarea key={tareaEnEdicion ? tareaEnEdicion.id:"nueva"}
        onAgregar={agregarTarea}
        onGuardar={guardarEdicion}
        tareaEnEdicion={tareaEnEdicion}/>

        <ListaTareas tareas={tareas} onCompletar={completarTarea} onEditar={editarTarea} onEliminar={eliminarTarea}/>
        
    </div>
)
}