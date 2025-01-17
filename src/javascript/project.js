import Todo from "./todo.js";

export default class Project {
    constructor(title, todos = []) {
        this.title = title;
        this.todos = todos;
    }

    addTodo(title, description, dueDate, priority) {
        const newTodo = new Todo(title, description, dueDate, priority);
        this.todos.push(newTodo);
    }
}