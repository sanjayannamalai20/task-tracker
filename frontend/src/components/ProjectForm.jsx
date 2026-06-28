import { useState } from "react";
import { createProject } from "../api/taskApi";

function ProjectForm() {
  const [project, setProject] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProject(project);

      alert("Project Added Successfully");

      setProject({
        name: "",
        description: "",
      });

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to add project");
    }
  };

  return (
    <div className="card p-4">
      <h2 className="mb-3">Add Project</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            Project Name
          </label>

          <input
            type="text"
            className="form-control"
            name="name"
            value={project.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Description
          </label>

          <textarea
            className="form-control"
            rows="3"
            name="description"
            value={project.description}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary">
          Save Project
        </button>
      </form>
    </div>
  );
}

export default ProjectForm;