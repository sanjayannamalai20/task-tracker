import { useEffect, useState } from "react";
import { getProjects } from "../api/taskApi";

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card p-3 mt-3">
      <h3>Projects</h3>

      {projects.length === 0 ? (
        <p>No Projects Found</p>
      ) : (
        <ul className="list-group">
          {projects.map((project) => (
            <li key={project.id} className="list-group-item">
              <h5>{project.name}</h5>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProjectList;