import { FormularioTarea } from "../components/FormularioTarea";
import type { Tarea, NuevaTarea } from "../types/Tarea";
import { useState, useEffect} from "react";
import { ListaTareas } from "../components/ListaTareas";
import { useAuth } from "../hooks/useAuth";
import { actualizarTarea,crearTarea,eliminarTarea,escucharTareas } from "../services/tareasService";


export function PaginaTareas(){

const [tareas, setTareas] = useState<Tarea[]>([]);
const [tareaEnEdicion, setTareaEnEdicion] = useState<Tarea| null>(null);
const {usuario,salir} = useAuth();
const uid = usuario?.uid;
const[cargando, setCargando] = useState(true);
const[error, setError] = useState("");

 
useEffect(() => {
    if (!uid) return;
    const dejarDeEscuchar = escucharTareas(
      uid,
      (lista) => {
        setTareas(lista);
        setCargando(false);
      },
      () => {
        setError("No se pudieron cargar las tareas.");
        setCargando(false);
      }
    );
    return () => dejarDeEscuchar();
  }, [uid]);

useEffect(() => {
  const pendientes = tareas.filter((tarea) => !tarea.completada).length;
  document.title = `Gestor de tareas (${pendientes} pendientes)`;
}, [tareas]);

const ejecutar = async (accion: () => Promise<void>) => {
    try {
      setError("");
      await accion();
    } catch {
      setError("No se pudo completar la acción. Intenta de nuevo.");
    }
  };

const borrarTarea = (id : string) => {
    void ejecutar(() => eliminarTarea(id));
};

const completarTarea = (id: string) => {
  const tarea = tareas.find((t) => t.id === id);
    if (!tarea) return;
    void ejecutar(() => actualizarTarea(id, { completada: !tarea.completada }));
  };

const editarTarea = (id: string) => {
  const encontrada = tareas.find((tarea)=>tarea.id === id);
  if (encontrada){
    setTareaEnEdicion(encontrada)
  }
};

const guardarEdicion = (id: string, datos: NuevaTarea) => {
  void ejecutar(async () => {
      await actualizarTarea(id, datos);
      setTareaEnEdicion(null);
    });
};

const agregarTarea = (datos:NuevaTarea) =>{
  if (!uid)return;
  void ejecutar(() => crearTarea(datos, uid));
  };


return(
    <div>
        <h1>Gestor de tareas</h1>
        <button onClick={salir}>Cerrar sesion</button>
        <FormularioTarea key={tareaEnEdicion ? tareaEnEdicion.id:"nueva"}
        onAgregar={agregarTarea}
        onGuardar={guardarEdicion}
        tareaEnEdicion={tareaEnEdicion}/>

         {error && <p role="alert">{error}</p>} {cargando ? (
        <p>Cargando tareas...</p>) : (

        <ListaTareas tareas={tareas} onCompletar={completarTarea} onEditar={editarTarea} onEliminar={borrarTarea}/>
        )}
    </div>
);
}