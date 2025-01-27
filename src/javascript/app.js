import Project from './project.js';

export default class App {
    static projects = [];
    static currentProject = null;

    static initialize() {
        this.addProject("All Todos");
    }

    static addProject(titleValue) {
        const newProject = new Project(titleValue);
        this.projects.push(newProject);
        this.currentProject = newProject;
    }
    
}