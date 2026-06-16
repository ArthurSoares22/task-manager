import { useState } from "react"; //estado que muda em tempo real
import { useEffect } from "react"; //efeito colateral
import api from '../../services/api'//importando api do backend feito em node.js 

function Dashboard() {
  const [tasks, setTask] = useState([])//string, number, array...
  const [NewTaskTitle, setNewTaskTitle] = useState('');

   async function fetchTasks() {
      const resposta = await api.get('/tasks')
      console.log(resposta.data)
      setTask(resposta.data)
     
    }
  useEffect(() => { fetchTasks() }, [])

  async function handleCreateTask() {
  await api.post('/tasks', { title: NewTaskTitle })
  setNewTaskTitle('')  // limpa o input
   fetchTasks()
}

async function  handleCheckTasks(taskId) {
  await api.patch('/tasks/' + taskId)
  fetchTasks()
}

async function handleDeleteTask(taskId) {
  await api.delete('/tasks/' + taskId) 
  fetchTasks()
}


  return ( 
    <div>
      <h1>Dashboard</h1>

      <input  type="text" value={NewTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)}  />
      <button onClick={handleCreateTask}>Criar tarefa</button>
      {tasks.map((task) => (

        <div key={task.id}>
          <p>{task.title}</p>
          <button onClick={()=> handleCheckTasks(task.id)}>Concluir</button>
          <button onClick={()=> handleDeleteTask(task.id)}>Deletar</button>
        </div>
      ))}
    </div>
  )



}

export default Dashboard;