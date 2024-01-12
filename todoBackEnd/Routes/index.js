const express = require('express');
const {login , createUser} = require('../Controllers/authControllers/index');
const {createTodo , getTodoById , getAllTodo, deleteTodo , updateTodo,completeTodos} = require('../Controllers/todoControllers/index');
const {validateEmailAndPassword, validateUserFields} = require('../Middlewares/authMiddleware/index');


const route = express.Router();

route.post('/login',validateEmailAndPassword,login);
route.post('/createuser',validateUserFields,createUser);

route.post('/createtodo',createTodo);
route.get('/gettodo/:id',getTodoById);
route.get('/gettodos/:id',getAllTodo);
route.delete('/deletetodo/:id',deleteTodo);
route.put('/updatetodo/:id',updateTodo);
route.put('/updatestatus',completeTodos)



module.exports = route;