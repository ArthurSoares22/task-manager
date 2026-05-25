const db = require('../config/database')

exports.taskList = (req, res) => {
    const { id } = req.user;

    const findtasks = db.prepare('SELECT * FROM tasks WHERE user_id = ?')
    const tasks = findtasks.all(id)
    return res.status(200).json(tasks)
}

exports.taskCreate = (req, res) => {
    const { id } = req.user;
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: "title não enviado" })

    }
    const insertTask = db.prepare('INSERT INTO tasks (title, user_id) VALUES (?, ?)')
    insertTask.run(title, id)

    return res.status(201).json({ message: 'task criada com sucesso! ' })
}

exports.taskCheck = (req, res) => {
    const { id: taskId } = req.params;
    const {id: userId} = req.user;
    const numericTaskId = Number(taskId)

    const findtask = db.prepare('SELECT * FROM tasks WHERE id = ?')
    const task = findtask.get(taskId)
    if (!task) {
        return res.status(404).json({ message: "tarefa não encontrada" })
    }

    if(task.user_id != userId ){
        return res.status(403).json({ message: "não autorizado" })
    }

    const updatetask = db.prepare('UPDATE tasks SET done = 1 WHERE id = ?')
    updatetask.run(taskId)
    return res.status(200).json({message: 'SUCESSO!'});
}

exports.taskDelete = (req, res) => {
   const { id: taskId} =  req.params;
   const {id: userId} = req.user
   
   const findtask = db.prepare('SELECT * FROM tasks WHERE id = ?')
   const task =  findtask.get(taskId);

   if(!task){

        return res.status(404).json({ message: "tarefa não encontrada" })
   }

    if(task.user_id != userId ){
        return res.status(403).json({ message: "não autorizado" })
    }

    const deletetask = db.prepare('DELETE FROM tasks WHERE id = ?')
    deletetask.run(taskId);
    return res.status(200).json({message: 'task apagada com sucesso!'});
}

