import Navbar from "../components/Navbar";
import ProjectList from "../components/ProjectList";
import TaskList from "../components/TaskList";
import DashboardCards from "../components/DashboardCards";


function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <DashboardCards />
        <ProjectList />

        <hr />

        <TaskList />
      </div>
    </>
  );
}

export default Dashboard;