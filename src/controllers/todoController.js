// src/controllers/todoController.js
const Todo = require('../models/ToDo');

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.findAll();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createTodo = async (req, res) => {
    try {
        const { title } = req.body;
        const newTodo = await Todo.create({ title });
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;

        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        todo.title = title || todo.title;
        todo.completed = completed !== undefined ? completed : todo.completed;

        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        await todo.destroy();
        res.json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
