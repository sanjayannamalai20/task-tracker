import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const getProjects = () => API.get("/projects");

export const createProject = (project) =>
  API.post("/projects", project);

export const getTasks = () => API.get("/tasks");

export const createTask = (task) =>
  API.post("/tasks", task);

export default API; 