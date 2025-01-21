import { format } from "date-fns";
import App from "./app.js";

const sideBar = document.getElementsByClassName("side-bar")[0];
const projects = document.getElementsByClassName("projects")[0];
const addProject = document.getElementsByClassName("add-project")[0];
const projectForm = document.getElementsByClassName("project-form")[0];
const submitProject = document.getElementsByClassName("submit-project")[0];
const projectTitle = document.getElementById("project-title");

const todos = document.getElementsByClassName("todos")[0];
const todoHeading = document.getElementsByClassName("content-heading")[0];
const addTodo = document.getElementsByClassName("add-todo")[0];
const todoForm = document.getElementsByClassName("todo-form")[0];
const submitTodo = document.getElementsByClassName("submit-todo")[0];
const title = document.getElementById("title");
const description = document.getElementById("description");
const dueDate = document.getElementById("due-date");
const priority = document.getElementById("priority");

/* Form visibility */

addProject.addEventListener("click", e => {
    addProject.style.display = "none";
    projectForm.style.display = "flex";

    addTodo.style.display = "block";
    todoForm.style.display = "none";
});

addTodo.addEventListener("click", e => {
    addTodo.style.display = "none";
    todoForm.style.display = "flex";

    addProject.style.display = "block";
    projectForm.style.display = "none";
});

document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        addProject.style.display = "block";
        projectForm.style.display = "none";

        addTodo.style.display = "block";
        todoForm.style.display = "none";
    }
});

/* Form submission */

submitProject.addEventListener("click", e => {
    e.preventDefault();
    const titleValue = projectTitle.value;

    if (titleValue) {
        App.addProject(titleValue);
        loadPage();
        addProject.style.display = "block";
        projectForm.style.display = "none";
    }
});

submitTodo.addEventListener("click", e => {
    e.preventDefault();
    const titleValue = title.value;
    const descriptionValue = description.value;
    const dueDateValue = dueDate.value;
    const priorityValue = priority.value;

    if (titleValue && descriptionValue && dueDateValue && priorityValue) {
        App.currentProject.addTodo(titleValue, descriptionValue, format(dueDateValue, "dd/MM/yyyy"), priorityValue);
        loadPage();
        addTodo.style.display = "block";
        todoForm.style.display = "none";
    }
});

/* Other functions */

export default function loadPage() {
    projects.textContent = "";
    todos.textContent = "";
    todoHeading.textContent = App.currentProject.title;
    App.projects.forEach(project => {
        loadProject(project);
    });
    loadCurrentProjectTodos();
}

const loadProject = (project) => {
    const heading = document.createElement("h3");
    heading.classList.add("side-subheading");
    if (project.title === "All Todos") {
        heading.classList.add("all-todos");
        heading.textContent = "~ ";
    } else {
        heading.textContent = "# ";
    }
    heading.textContent += project.title;
    projects.appendChild(heading);
    initializeProject(heading, project);
}

const initializeProject = (projectElement, projectObject) => {
    projectElement.addEventListener("click", e => {
        App.currentProject = projectObject;
        loadPage();
    });
}

const loadCurrentProjectTodos = () => {
    const currentProject = App.currentProject;
    currentProject.todos.forEach(todo => {
        loadTodo(todo);
    });
}

const loadTodo = (todo) => {
    const paragraph = document.createElement("div");
    paragraph.classList.add("todo");
    paragraph.innerHTML = `
    <div class="todo-info">
        <input type="checkbox" id="is-done-${todo.title}">
        <span class="block-title">${todo.title}</span>
        <span class="priority-${todo.priority}">~${todo.priority}~</span>
    </div>
    <div class="todo-extra" id="todo-extra-${todo.title}">
        <p class="block-date">${todo.dueDate}</p>
        <p class="block-description">${todo.description}</p>
    </div>
    `
    todos.appendChild(paragraph);

    initializeTodo(paragraph, todo);
    initializeIsDone(todo);
}

const initializeTodo = (todoElement, todoObject) => {
    todoElement.addEventListener("click", e => {
        const todoExtra = document.getElementById(`todo-extra-${todoObject.title}`);
        if (todoExtra) {
            todoExtra.classList.toggle("todo-extra");
        }
    })
}

const initializeIsDone = (todoObject) => {
   const isDone = document.getElementById(`is-done-${todoObject.title}`);
   isDone.addEventListener("click", e => {
        App.currentProject.deleteTodo(todoObject);
        loadPage();
    })
}