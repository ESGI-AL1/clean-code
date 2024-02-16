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
      <form class="max-w-sm mx-auto inline-grid grid-cols-3 gap-4">
        <label for="underline_select" class="sr-only">Underline select</label>
        <select id="underline_select" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
            <option selected>Choose a country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
        </select>
        <label for="underline_select" class="sr-only">Underline select</label>
        <select id="underline_select" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
            <option selected>Choose a country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
        </select>
        <button
          className='bg-indigo-500 p-3 rounded-lg w-full mt-3'
        >
          Search
        </button>
      </form>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

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