const { createTodoService, getTodo, getUserTodosService, deleteTodoService, updateTodoService, updateStatusService } = require('../../Services/todoService/index');


exports.createTodo = async (req, resp) => {

    try {

        let todoData = req.body;

        let ack = await createTodoService(todoData);
        if (ack) {
            resp.status(201).json({ message: "Task Added" });
        }
        else {
            resp.status(400).json({ message: "Task is not Added" });
        }

    } catch (error) {
        console.log("Server Error", error)
    }

}


exports.getTodoById = async (req, resp) => {
    try {
        let { id } = req.params
        if (id) {
            let todo = await getTodo(id);
            if (todo) {
                resp.status(200).json({ task: todo });
            }
            else {
                resp.status(404).json({ message: "No Task Found By This Id" })
            }
        }
        else {
            resp.status(400).json({ message: "Please Provide Id" })

        }
    } catch (error) {
        console.log("Server Error")
    }
}


exports.getAllTodo = async (req, resp) => {

    let { id } = req.params;

    try {
        let todos = await getUserTodosService(id);
        if (todos.length) {
            resp.status(200).json({ data: todos });
        }
        else {
            resp.status(404).json({ message: "Todos Not Found",data:todos })
        }
    } catch (error) {
        console.log("Server Erro", error);
    }
}

exports.deleteTodo = async (req, resp) => {

    try {

        let { id } = req.params;
        if (id) {
            let ack = await deleteTodoService(id);
            if (ack) {
                resp.status(200).json({ message: "Todo is Deleted!" });
            }

        } else {
            resp.status(400).json({ message: "Please provide Id" });
        }

    } catch (error) {
        console.log("Server Erro", error);
    }
}

exports.updateTodo = async (req, resp) => {
    try {

        let { id } = req.params;

        let ack = await updateTodoService({ id, ...req.body });
        console.log(ack)
        if (ack) {
            resp.status(200).json({ message: "Todo is Updated" });
        }
        else {
            resp.status(400).json({ message: "Todo is not Updated" });
        }
    } catch (error) {
        console.log("Server Erro", error);
    }
}

exports.completeTodos = async (req, resp) => {

    try {

        let todoIds = req.body;
        if (todoIds.length) {
            let ack = await updateStatusService(todoIds);
            if (ack) {
                resp.status(201).json({ message: "Status Updated" })

            }
        }
    } catch (error) {
        console.log("Server Error", error);
    }

}

