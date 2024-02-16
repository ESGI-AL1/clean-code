import { useEffect } from "react";
import { getAllTasks } from "../api/tasks.api";
import { useState } from "react";
import TaskCard from "./TaskCard";

const TasksList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect (() => {
    async function loadTasks() {
      const res = await getAllTasks()
      setTasks(res.data)
    }
    loadTasks();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-1">
    {tasks.map((task) => (
      <TaskCard 
        key={task.id} 
        task={task}
      />
    ))} 
    </div>
  );
}
 
export default TasksList;