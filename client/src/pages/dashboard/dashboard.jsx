import { useState } from "react";
import { useEffect } from "react";
import api from '../../services/api'

function  Dashboard(){
  const [tasks, setTask] = useState([])

  useEffect(() =>{
    async function fetchTasks() {
       const resposta = await api.get('/tasks')
    console.log(resposta.data)
    setTask(resposta.data)
    }
   fetchTasks()
  }, [])


  return (
  <div>
    <h1>Dashboard</h1>
    {tasks.map((task) => (
      <div key={task.id}>
        <p>{task.title}</p>
      </div>
    ))}
  </div>
)
}

export default Dashboard;