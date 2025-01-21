  import React from "react";

  interface Task {
    id: number;
    title: string;
    description: string;
    status: "pending" | "completed";
    priority: "Low" | "Medium" | "High";
  }


  interface TaskListProps {
    tasks: Task[];
    deleteTask: (id: number) => void; 
  }

  const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask }) => {
    return (
      <div>
        <h2>Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Task Title</th>
                <th scope="col">Status</th>
                <th scope="col">Priority</th>
                <th scope="col">Actions</th> {/* New column for Actions */}
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.title}</td>
                  <td>{task.status}</td>
                  <td>{task.priority}</td>
                  <td>
                    <button onClick={() => deleteTask(task.id)}>Delete</button> {/* Delete button */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };

  export default TaskList;
