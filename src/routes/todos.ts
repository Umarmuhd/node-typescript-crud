import { Router } from "express";
import { Todo } from "../models/todo";

const router = Router();

type RequestParams = { todoId: string };
type RequestBody = { text: string };

let todos: Todo[] = [];

router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post("/todo", (req, res, next) => {
  const body = req.body as RequestBody;

  const newTodo: Todo = { id: new Date().toISOString(), text: body.text };

  if (newTodo.text !== "") {
    todos.push(newTodo);

    return res
      .status(201)
      .json({ message: "todo added successfully", todo: newTodo });
  }

  return res.status(400).json({ message: "todo text cannot be empty" });
});

router.put("/todo/:todoId", (req, res, next) => {
  const params = req.params as RequestParams;
  const body = req.body as RequestBody;

  const tid = params.todoId;
  const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
    return res
      .status(200)
      .json({ message: "todo updated successfully", todos });
  }

  return res
    .status(404)
    .json({ message: "Could not find the todo for this id" });
});

router.delete("/todos/:todoId", (req, res, next) => {
  const params = req.params as RequestParams;
  const tid = params.todoId;
  todos = todos.filter((todoItem) => todoItem.id !== tid);
  res.status(200).json({ message: "todo deleted successfully" });
});

export default router;
