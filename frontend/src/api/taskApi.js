import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Project APIs
export const getProjects = () => API.get("/projects");

export const createProject = (project) =>
  API.post("/projects", project);

export const updateProject = (id, project) =>
  API.put(`/projects/${id}`, project);

export const deleteProject = (id) =>
  API.delete(`/projects/${id}`);

// Task APIs
export const getTasks = () => API.get("/tasks");

export const createTask = (task) =>
  API.post("/tasks", task);

export const updateTask = (id, task) =>
  API.put(`/tasks/${id}`, task);

export const deleteTask = (id) =>
  API.delete(`/tasks/${id}`);

export default API;