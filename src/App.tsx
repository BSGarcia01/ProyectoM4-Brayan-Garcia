import { PaginaTareas } from './pages/PaginaTareas'
import { PaginaLogin } from './pages/PaginaLogin';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='tareas' element={<PaginaTareas/>}/>
      <Route path='login'element={<PaginaLogin/>}/>
      <Route path='/' element={<Navigate to="/tareas" replace />}/>
    </Routes>)}
  

export default App
