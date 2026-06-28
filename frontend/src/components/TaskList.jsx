import { useEffect, useState } from "react";
import { getTasks } from "../api/taskApi";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card p-4 mt-4">
      <h2>Task List</h2>

      {tasks.length === 0 ? (
        <p>No Tasks Found</p>
      ) : (
        <table className="table table-bordered table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Project</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.status}</td>
                <td>{task.priority}</td>
                <td>{task.dueDate}</td>
                <td>{task.project?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TaskList;