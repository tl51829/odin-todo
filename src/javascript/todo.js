export const PRIORITIES = Object.freeze({
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high'
  })  

export default class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    updateProperty({
        value,
        property,
        project
    }) {
        this[property] = value
        project.updateTodo(this)
    }
}