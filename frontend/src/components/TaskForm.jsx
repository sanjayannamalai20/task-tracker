import { useEffect, useState } from "react";
import { createTask, getProjects } from "../api/taskApi";

function TaskForm() {
  const [projects, setProjects] = useState([]);

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    dueDate: "",
    project: {
      id: "",
    },
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "projectId") {
      setTask({
        ...task,
        project: {
          id: value,
        },
      });
    } else {
      setTask({
        ...task,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTask(task);

      alert("Task Added Successfully");

      setTask({
        title: "",
        description: "",
        status: "TODO",
        priority: "MEDIUM",
        dueDate: "",
        project: {
          id: "",
        },
      });
    } catch (error) {
      console.error(error);
      alert("Failed to add task");
    }
  };

  return (
    <div className="card p-4 mt-4">
      <h2>Add Task</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label>Title</label>
          <input
            className="form-control"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            rows="3"
            name="description"
            value={task.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Status</label>

          <select
            className="form-select"
            name="status"
            value={task.status}
            onChange={handleChange}
          >
            <option value="TODO">TODO</option>
            <option value="DOING">DOING</option>
            <option value="DONE">DONE</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Priority</label>

          <select
            className="form-select"
            name="priority"
            value={task.priority}
            onChange={handleChange}
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Due Date</label>

          <input
            type="date"
            className="form-control"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Project</label>

          <select
            className="form-select"
            name="projectId"
            value={task.project.id}
            onChange={handleChange}
            required
          >
            <option value="">Select Project</option>

            {projects.map((project) => (
              <option
                key={project.id}
                value={project.id}
              >
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-success">
          Save Task
        </button>

      </form>
    </div>
  );
}

export default TaskForm;