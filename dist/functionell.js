"use strict";
function renderProjectInput() {
    const templete = document.getElementById("project-input");
    const app = document.getElementById("app");
    const clone = document.importNode(templete.content, true);
    app.appendChild(clone);
    const form = app.querySelector("form");
    form.addEventListener("submit", handleProjectSubmit);
}
function handleProjectSubmit(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const people = document.getElementById("people").value;
    addProjectToList(title, description, +people);
}
function addProjectToList(title, description, people) {
    const projectTemplate = document.getElementById("project-list");
    const projectList = document.importNode(projectTemplate.content, true);
    const listElement = projectList.querySelector("ul");
    const projectItem = document.createElement("li");
    projectItem.textContent = `${title} (${people} people): ${description}`;
    listElement.appendChild(projectItem);
    const app = document.getElementById("app");
    app.appendChild(projectList);
}
renderProjectInput();
//# sourceMappingURL=functionell.js.map