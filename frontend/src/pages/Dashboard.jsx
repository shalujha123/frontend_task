import { useEffect, useState } from "react";
import api from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        let url = "/tasks";
        const params = [];
        if (query) params.push(`q=${query}`);
        if (filter !== "all") params.push(`completed=${filter === "completed"}`);
        if (params.length > 0) url += "?" + params.join("&");

        const res = await api.get(url);
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks");
      }
    };
    fetchTasks();
  }, [query, filter]);

  const handleTaskAdded = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
  };

  const handleTaskDeleted = (id) => {
    setTasks(tasks.filter((t) => t._id !== id));
  };

  return (
    <div className="container">
      <h2>My Tasks</h2>

      {/* Search + Filter */}
      <div className="card" style={{ marginBottom: "20px" }}>
        <form style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Search tasks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ flex: 1 }}
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </form>
      </div>

      {/* Add Task Form */}
      <TaskForm onTaskAdded={handleTaskAdded} />

      {/* Task List */}
      <div>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onTaskUpdated={handleTaskUpdated}
              onTaskDeleted={handleTaskDeleted}
            />
          ))
        ) : (
          <p style={{ color: "#666", marginTop: "20px" }}>No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
