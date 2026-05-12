const express = require('express')
const routes = express.Router()
const taskController = require('../controllers/taskController')
const {auth} = require('../middleware/auth')

routes.get('/',auth, taskController.taskList)
routes.post('/',auth, taskController.taskCreate)
routes.patch('/:id', auth, taskController.taskCheck)
routes.delete('/:id', auth,  taskController.taskDelete)

module.exports = routes

// GET    /tasks         — listar todas as tarefas do usuário
// POST   /tasks         — criar uma tarefa
// PATCH  /tasks/:id     — marcar tarefa como feita
// DELETE /tasks/:id     — deletar uma tarefa