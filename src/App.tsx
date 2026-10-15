import { PaginaTareas } from './pages/PaginaTareas'
import { PaginaLogin } from './pages/PaginaLogin';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RutaProtegida } from './components/RutaProtegida';

function App() {
  return (
    <Routes>
      <Route path='tareas' element={<RutaProtegida>
        <PaginaTareas/>
      </RutaProtegida>}/>

      <Route path='login'element={<PaginaLogin/>}/>

      <Route path='/' element={<Navigate to="/tareas" replace />}/>
    </Routes>)}
  

export default App
