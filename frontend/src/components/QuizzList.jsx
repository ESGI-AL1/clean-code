import { useEffect } from "react";
import { getAllQuizzs } from "../api/cards.api";
import { useState } from "react";
import Quizz from "./Quizz";

const QuizzList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect (() => {
    async function loadCards() {
      const res = await getAllQuizzs()
      setTasks(res.data)
    }
    loadCards();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-1">
    {tasks.map((task) => (
      <Quizz 
        key={task.id} 
        task={task}
      />
    ))} 
    </div>
  );
}
 
export default QuizzList;