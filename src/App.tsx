import React, { useState, useEffect } from "react";
import TaskList from "./Components/TaskList";
import AddTaskForm from "./Components/AddTaskForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface Task {
  id: number;
  title: string;
  description: string;
  status: "pending" | "completed";
  priority: "Low" | "Medium" | "High";
}

function App() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"" | "pending" | "completed">(""); // Fix here

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    const tasksFromStorage = savedTasks ? JSON.parse(savedTasks) : [];
    if (Array.isArray(tasksFromStorage)) {
      setTasks(tasksFromStorage);
    } else {
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
    toast.success("Task added successfully!");
  };

  // Delete a task
  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast.success("Task deleted successfully!");
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    return (
      task.title.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter ? task.status === statusFilter : true)
    );
  });

  return (
    <div className="App">
      <h1>Task Details</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by task name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filter dropdown */}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value as "" | "pending" | "completed")} 
      >
        <option value="">Filter by status</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      {/* Add Task Form */}
      <AddTaskForm addTask={addTask} />

      {/* Task List */}
      <TaskList tasks={filteredTasks} deleteTask={deleteTask} />

      <ToastContainer />
    </div>
  );
}

export default App;
