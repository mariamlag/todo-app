 const { readFileSync, writeFileSync, write } = require('fs');
 const express = require('express');
const { json } = require('body-parser');
 const router = express.Router();
const PATH_TO_DATA ='./data/todos.json';

 const getTodos = () =>{
    return JSON.parse(readFileSync(PATH_TO_DATA));
 }

 const appendTodo = (todo) => {
    getTodos = getTodos();
    todos.push(todo);

    writeFileSync(PATH_TO_DATA, JSON.stringify(todos))
 }

 router.get('/',(req, res) => {
    res.json(getTodos());
 });


 router.get('/:todoId',(req, res) => {
    const todos = getTodos();
    const todoId = req.params.todoId;
    const result = todos.filter((todo) => todo.id == todoId);
    if(result.length == 0) {
        res.status(404).json("error");
    }else {
        res.json(result[0]);
    }
 });

 
 router.post('/',() => {
    const newTodo ={
        id: todos.length,
        ...req.body
    }
    todos.push(newTodo);
    res.status(201).json(newTodo);
 });


 router.put('/:todoId',() => {});
 router.delete('/:todoId',() => {});

 module.exports = router;
