import { useState } from "react";
import api from "../../services/api";
import {useNavigate} from 'react-router-dom'
//funcão de criar login
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()



  async function handleLogin(){
  try {
    const resposta = await api.post('/auth/login', {email, password})
    const token = resposta.data.token
    localStorage.setItem('token', token)
    //para redirecionar a pagina
navigate ('/dashboard')
  } catch (error) {
    console.log("Erro")
  }
}

  return (
  <div>
    <input
      type="text"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <input 
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
 />

    <button onClick={handleLogin}>Entrar</button>
  </div>
)


}




export default Login;