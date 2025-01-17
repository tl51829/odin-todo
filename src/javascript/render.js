import { format } from "date-fns";
import App from "./app.js";

const sideBar = document.getElementsByClassName("side-bar")[0];
const projects = document.getElementsByClassName("projects")[0];
const addProject = document.getElementsByClassName("add-project")[0];
const projectForm = document.getElementsByClassName("project-form")[0];
const submitProject = document.getElementsByClassName("submit-project")[0];
const projectTitle = document.getElementById("project-title");

const todos = document.getElementsByClassName("todos")[0];
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
    }
});

submitTodo.addEventListener("click", e => {
    e.preventDefault();
    const titleValue = title.value;
    const descriptionValue = description.value;
    const dueDateValue = new Date(dueDate.value);
    const priorityValue = priority.value;

    if (titleValue && descriptionValue && dueDateValue && priorityValue) {
        App.currentProject.addTodo(titleValue, descriptionValue, format(dueDateValue, "MM/dd/yyyy"), priorityValue);
        loadPage();
    }
});

/* Other functions */

export default function loadPage() {
    projects.textContent = "";
    todos.textContent = "";
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
}

const loadCurrentProjectTodos = () => {
    const currentProject = App.currentProject;
    currentProject.todos.forEach(todo => {
        loadTodo(todo);
    });
}

const loadTodo = (todo) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = todo.title;
    todos.appendChild(paragraph);
}