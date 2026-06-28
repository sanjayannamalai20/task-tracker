import Navbar from "../components/Navbar";
import ProjectForm from "../components/ProjectForm";
import ProjectList from "../components/ProjectList";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <ProjectForm />

        <hr />

        <ProjectList />

        <hr />

        <TaskForm />

        <hr />

        <TaskList />
      </div>
    </>
  );
}

export default Dashboard;