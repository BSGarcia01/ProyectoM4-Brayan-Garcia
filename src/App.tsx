import { PaginaTareas } from './pages/PaginaTareas'
import { PaginaLogin } from './pages/PaginaLogin';
import { Route,Routes } from 'react-router-dom';

function App() {
  return (<Routes>
      <Route path='tareas' element={<PaginaTareas/>}/>
      <Route path='login'element={<PaginaLogin/>}/>
    </Routes>)}
  

export default App
