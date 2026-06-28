import { useEffect, useState } from "react";
import {
  getProjects,
  deleteProject,
} from "../api/taskApi";
import ProjectForm from "./ProjectForm";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);

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

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await deleteProject(id);
      loadProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const finishEditing = () => {
    setEditingProject(null);
    loadProjects();
  };

  return (
    <>
      <ProjectForm
        editingProject={editingProject}
        onFinish={finishEditing}
      />

      <div className="card p-4 mt-4">
        <h2>Projects</h2>

        <table className="table table-bordered table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th width="180">Action</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.description}</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(project)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProjectList;