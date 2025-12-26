// index.js
import express from "express";

const app = express();
const PORT = 3000;

// middleware to read JSON body
app.use(express.json());

let todos = [];

app.post("/todos", (req, res) => {
    const { task } = req.body;

    if (!task) {
        return res.status(400).json({ error: "Task is required" });
    }

    const newTodo = {
        id: 1,
        task,
        completed: false
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.get("/todos", (req, res) => {
    res.json(todos);
});

app.put("/todos/:id", (req, res) => {
    const id = req.params.id;
    const { task } = req.body;

    const todo = todos.find(t => t.id === id);
    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }

    if (task !== undefined) todo.task = task;
    res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
    const id = req.params.id;

    todos = todos.filter(t => t.id !== id);
    res.json({ message: "Todo deleted" });
});

app.listen(PORT, () => {
    console.log(`Server running on: ${PORT}`);
});