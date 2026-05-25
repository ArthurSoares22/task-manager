import { BrowserRouter, Routes, Route } from 'react-router-dom' // importando as dependencias do react router dom
import Login from './pages/Login/Login' // importando a pagina de login 
import Dashboard from './pages/Dashboard/Dashboard'// importando a pagina de dashboard

function App() {//componente prinicipal da aplicação
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App