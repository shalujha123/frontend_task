import { useState } from "react";
import api from "../services/api";

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      const res = await api.post("/tasks", { title, description });
      onTaskAdded(res.data);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err.response?.data?.message || "Error adding task");
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="btn-primary">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
