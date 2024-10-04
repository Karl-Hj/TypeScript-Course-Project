"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class ProjectState {
    constructor() {
        this.listners = [];
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addListener(listernerFn) {
        this.listners.push(listernerFn);
    }
    addProject(title, description, numOfPeople) {
        const newProject = {
            id: Math.random().toString(),
            title: title,
            description: description,
            people: numOfPeople,
        };
        this.projects.push(newProject);
        for (const listernerFn of this.listners) {
            listernerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();
function validate(ValidatableInput) {
    let isValid = true;
    if (ValidatableInput.required) {
        isValid = isValid && ValidatableInput.value.toString().trim().length !== 0;
    }
    if (ValidatableInput.minLength != null &&
        typeof ValidatableInput.value === "string") {
        isValid =
            isValid && ValidatableInput.value.length >= ValidatableInput.minLength;
    }
    if (ValidatableInput.maxLength != null &&
        typeof ValidatableInput.value === "string") {
        isValid =
            isValid && ValidatableInput.value.length <= ValidatableInput.maxLength;
    }
    if (ValidatableInput.min != null &&
        typeof ValidatableInput.value === "number") {
        isValid = isValid && ValidatableInput.value >= ValidatableInput.min;
    }
    if (ValidatableInput.max != null &&
        typeof ValidatableInput.value === "number") {
        isValid = isValid && ValidatableInput.value <= ValidatableInput.max;
    }
    return isValid;
}
function Autobind(_, _2, descriptor) {
    const orginalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = orginalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
class ProjectList {
    constructor(type) {
        this.type = type;
        this.assingedProjects = [];
        this.template = document.getElementById("project-list");
        this.hostElement = document.getElementById("app");
        this.assingedProjects = [];
        const clone = document.importNode(this.template.content, true);
        this.element = clone.firstElementChild;
        this.element.id = `${this.type}-projects`;
        projectState.addListener((projects) => {
            this.assingedProjects = projects;
            this.renderProjects();
        });
        this.attachToDOM();
        this.renderContent();
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        for (const prjItem of this.assingedProjects) {
            const listItem = document.createElement("li");
            listItem.textContent = prjItem.title;
            listEl.appendChild(listItem);
        }
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent =
            this.type.toUpperCase() + " PROJECTS";
    }
    attachToDOM() {
        this.hostElement.insertAdjacentElement("beforeend", this.element);
    }
}
class ProjectInput {
    constructor() {
        this.template = document.getElementById("project-input");
        this.hostElement = document.getElementById("app");
        const clone = document.importNode(this.template.content, true);
        this.element = clone.firstElementChild;
        this.element.id = "user-input";
        this.titleInputElement = this.element.querySelector("#title");
        this.descriptionInputElement = this.element.querySelector("#description");
        this.peopleInputElement = this.element.querySelector("#people");
        this.configure();
        this.attachToDOM();
    }
    attachToDOM() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
    gatheruserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true,
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        };
        const peopleValidatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 20,
        };
        if (!validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)) {
            alert("Invalid input, please try again!");
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatheruserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            this.clearInputs();
        }
    }
    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
}
__decorate([
    Autobind
], ProjectInput.prototype, "submitHandler", null);
const prjInput = new ProjectInput();
const activePrjList = new ProjectList("active");
const finsihedPrjList = new ProjectList("finished");
//# sourceMappingURL=app.js.map