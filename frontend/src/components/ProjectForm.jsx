import { useState, useEffect } from "react";
import {
  createProject,
  updateProject,
} from "../api/taskApi";

function ProjectForm({ editingProject, onFinish }) {
  const [project, setProject] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (editingProject) {
      setProject({
        name: editingProject.name,
        description: editingProject.description,
      });
    }
  }, [editingProject]);

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingProject) {
        await updateProject(editingProject.id, project);
        alert("Project Updated Successfully");
      } else {
        await createProject(project);
        alert("Project Added Successfully");
      }

      setProject({
        name: "",
        description: "",
      });

      if (onFinish) {
        onFinish();
      }
    } catch (error) {
      console.error(error);
      alert("Operation Failed");
    }
  };

  return (
    <div className="card p-4">
      <h2>{editingProject ? "Edit Project" : "Add Project"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Project Name</label>

          <input
            className="form-control"
            name="name"
            value={project.name}
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
            value={project.description}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary">
          {editingProject ? "Update Project" : "Save Project"}
        </button>
      </form>
    </div>
  );
}

export default ProjectForm;