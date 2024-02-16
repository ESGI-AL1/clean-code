import { useEffect } from "react";
import { getAllCards } from "../api/cards.api";
import { useState } from "react";
import TaskCard from "./TaskCard";

const TasksList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect (() => {
    async function loadCards() {
      const res = await getAllCards()
      setTasks(res.data)
    }
    loadCards();
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