import { useEffect, useState } from "react";
import { getProjects, getTasks } from "../api/taskApi";

function DashboardCards() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const projectResponse = await getProjects();
      const taskResponse = await getTasks();

      setProjects(projectResponse.data);
      setTasks(taskResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "DONE"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "DONE"
  ).length;

  return (
    <div className="row mb-4">

      <div className="col-md-3">
        <div className="card text-center bg-primary text-white">
          <div className="card-body">
            <h5>Total Projects</h5>
            <h2>{projects.length}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card text-center bg-success text-white">
          <div className="card-body">
            <h5>Total Tasks</h5>
            <h2>{tasks.length}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card text-center bg-warning text-dark">
          <div className="card-body">
            <h5>Completed</h5>
            <h2>{completedTasks}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card text-center bg-danger text-white">
          <div className="card-body">
            <h5>Pending</h5>
            <h2>{pendingTasks}</h2>
          </div>
        </div>
      </div>

    </div>
  );
}

export default DashboardCards;