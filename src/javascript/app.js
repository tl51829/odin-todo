import Project from './project.js';

export default class App {
    static projects = [];
    static currentProject = null;

    static initialize() {
        const allTodos = new Project("All Todos");
        this.projects.push(allTodos);
        this.currentProject = allTodos;
    }

    static addProject(titleValue) {
        const newProject = new Project(titleValue);
        this.projects.push(newProject);
    }
    
}