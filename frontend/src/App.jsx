import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary">
        Task Tracker
      </h1>

      <hr />

      <div className="card p-4 shadow">
        <h3>Backend Connection</h3>

        <p>
          Frontend is running successfully.
        </p>

        <button className="btn btn-success">
          Add Task
        </button>
      </div>
    </div>
  );
}

export default App;