import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../api/taskApi";
import TaskForm from "./TaskForm";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

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

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const finishEditing = () => {
    setEditingTask(null);
    loadTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ||
      task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "ALL" ||
      task.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });

  return (
    <>
      <TaskForm
        editingTask={editingTask}
        onFinish={finishEditing}
      />

      <div className="card p-4 mt-4">
        <h2>Task List</h2>

        {/* Search & Filters */}

        <div className="row mb-3">

          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search Task..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="ALL">All Status</option>
              <option value="TODO">TODO</option>
              <option value="DOING">DOING</option>
              <option value="DONE">DONE</option>
            </select>
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(e.target.value)
              }
            >
              <option value="ALL">All Priority</option>
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>
          </div>

        </div>

        {filteredTasks.length === 0 ? (
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
                <th width="180">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>

                  <td>
                    <span
                      className={
                        task.status === "DONE"
                          ? "badge bg-success"
                          : task.status === "DOING"
                          ? "badge bg-primary"
                          : "badge bg-warning text-dark"
                      }
                    >
                      {task.status}
                    </span>
                  </td>

                  <td>
                    <span
                      className={
                        task.priority === "HIGH"
                          ? "badge bg-danger"
                          : task.priority === "MEDIUM"
                          ? "badge bg-warning text-dark"
                          : "badge bg-secondary"
                      }
                    >
                      {task.priority}
                    </span>
                  </td>

                  <td>{task.dueDate}</td>

                  <td>
                    {task.project?.name || "-"}
                  </td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(task)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleDelete(task.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        )}
      </div>
    </>
  );
}

export default TaskList;