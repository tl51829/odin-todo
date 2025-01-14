const addProject = document.getElementsByClassName("add-project")[0];
const projectForm = document.getElementsByClassName("project-form")[0];
const addTodo = document.getElementsByClassName("add-todo")[0];
const todoForm = document.getElementsByClassName("todo-form")[0];

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
})
