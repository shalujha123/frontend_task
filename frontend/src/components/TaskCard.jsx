import { useState } from "react";
import api from "../services/api";

const TaskCard = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const toggleComplete = async () => {
    try {
      const res = await api.put(`/tasks/${task._id}`, {
        completed: !task.completed,
      });
      onTaskUpdated(res.data);
    } catch (err) {
      console.error("Error updating task");
    }
  };

  const deleteTask = async () => {
    try {
      await api.delete(`/tasks/${task._id}`);
      onTaskDeleted(task._id);
    } catch (err) {
      console.error("Error deleting task");
    }
  };

  const saveEdit = async () => {
    try {
      const res = await api.put(`/tasks/${task._id}`, { title, description });
      onTaskUpdated(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Error editing task");
    }
  };

  return (
    <div className="card task-card">
      {isEditing ? (
        <div style={{ flex: 1 }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
            <button onClick={saveEdit} className="btn-success">Save</button>
            <button onClick={() => setIsEditing(false)} className="btn-warning">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-info">
            <h3 className={`task-title ${task.completed ? "task-completed" : ""}`}>
              {task.title}
            </h3>
            <p>{task.description}</p>
          </div>
          <div className="actions" style={{ display: "flex", gap: "8px" }}>
            <button onClick={toggleComplete} className="btn-success">
              {task.completed ? "Undo" : "Done"}
            </button>
            <button onClick={() => setIsEditing(true)} className="btn-warning">Edit</button>
            <button onClick={deleteTask} className="btn-danger">Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
