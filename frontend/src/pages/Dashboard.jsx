import Navbar from "../components/Navbar";
import ProjectList from "../components/ProjectList";
import TaskList from "../components/TaskList";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <ProjectList />

        <hr />

        <TaskList />
      </div>
    </>
  );
}

export default Dashboard;