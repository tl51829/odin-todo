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
        App.currentProject.addTodo(titleValue, descriptionValue, dueDateValue, priorityValue);
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
    initializeEdit(paragraph, todo);
}

const initializeTodo = (todoElement, todoObject) => {
    todoElement.addEventListener("click", e => {
        const todoExtra = document.getElementById(`todo-extra-${todoObject.title}`);
        todoExtra.classList.toggle("todo-extra");
    })
}

const initializeIsDone = (todoObject) => {
   const isDone = document.getElementById(`is-done-${todoObject.title}`);
   isDone.addEventListener("click", e => {
        e.stopPropagation();
        App.currentProject.deleteTodo(todoObject);
        loadPage();
    }, true)
}

const initializeEdit = (todoElement, todoObject) => {
    const title = todoElement.children[0].children[1];
    const priority = todoElement.children[0].children[2];
    const date = todoElement.children[1].children[0];
    const description = todoElement.children[1].children[1];

    title.addEventListener("click", e => {
        e.stopPropagation();
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("value", title.textContent);
        input.classList.add("block-title");
        todoElement.children[0].replaceChild(input, title);

        input.addEventListener("blur", e => {
            todoObject.updateProperty(input.value, "title");
            loadPage();
        })

        input.addEventListener("keyup", e => {
            if (e.key === "Enter") {
                todoObject.updateProperty(input.value, "title");
                loadPage();
            }
        })

        input.addEventListener("click", e => {
            e.stopPropagation();
        })
    }, true)

    priority.addEventListener("click", e => {
        e.stopPropagation();
        const input = document.createElement("select");
        input.setAttribute("name", "priority");
        input.setAttribute("selected", priority.value);

        input.innerHTML = `
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
        `

        if (priority.textContent === "~high~") {
            input.children[0].setAttribute("selected", "");
        } else if (priority.textContent === "~medium~") {
            input.children[1].setAttribute("selected", "");
        } else {
            input.children[2].setAttribute("selected", "");

        }

        todoElement.children[0].replaceChild(input, priority);

        input.addEventListener("change", e => {
            todoObject.updateProperty(input.value, "priority");
            loadPage();
        })

        input.addEventListener("click", e => {
            e.stopPropagation();
        })
    }, true)

    date.addEventListener("click", e => {
        e.stopPropagation();
        const input = document.createElement("input");
        input.setAttribute("type", "date");
        input.setAttribute("value", date.textContent);
        input.classList.add("block-date");
        todoElement.children[1].replaceChild(input, date);

        input.addEventListener("change", e => {
            todoObject.updateProperty(input.value, "dueDate");
            loadPage();
        })

        input.addEventListener("click", e => {
            e.stopPropagation();
        })
    }, true)

    description.addEventListener("click", e => {
        e.stopPropagation();
        const input = document.createElement("textarea");
        input.setAttribute("rows", 10);
        input.setAttribute("cols", 50);
        input.setAttribute("class", "block-description");
        input.textContent = description.textContent;
        todoElement.children[1].replaceChild(input, description);

        input.addEventListener("change", e => {
            todoObject.updateProperty(input.value, "description");
            loadPage();
        })

        input.addEventListener("click", e => {
            e.stopPropagation();
        })
    }, true)

}
