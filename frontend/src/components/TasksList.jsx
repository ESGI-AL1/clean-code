import {useForm} from 'react-hook-form';
import { useEffect } from "react";
import { getAllCards, selectFilter } from "../api/cards.api";
import { useState } from "react";
import TaskCard from "./TaskCard";

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [selects, setSelects] = useState([]);

  const {register, handleSubmit, setValue, formState: {
    errors
  } } = useForm();

  async function loadCards(category, tag) {
    const res = await getAllCards(category, tag)
    setTasks(res.data)
  }

  async function loadSelect() {
    const ress = await selectFilter()
    console.log(ress.data)
    setSelects(ress.data)
  }

  useEffect (() => {
    setValue("tag", "DEFAULT")
    setValue("category", "DEFAULT")

    loadCards("DEFAULT", "DEFAULT");
    loadSelect()

    console.log(selects)
  }, []);

  const onSubmit = handleSubmit(async (data) => { 
    loadCards(data.category, data.tag)
  });

  return (
    <div className="grid grid-cols-1 gap-1">
      <form onSubmit={onSubmit} className="inline-grid grid-cols-3 gap-4">
        <label htmlFor="underline_select" className="sr-only">Underline select</label>
        <select defaultValue={'DEFAULT'}
          id="underline_select"
          {...register('category', {required: false})}
          className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
            <option value="DEFAULT" selected>Choose a category</option>
            {selects.categories?.map((category) => (
            <option tag={category} value={category}>{category}</option>
          ))}
        </select>
        <label htmlForfor="underline_select" className="sr-only">Underline select</label>
        <select defaultValue={'DEFAULT'}
          id="underline_select"
          {...register('tag', {required: false})}
          className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
          <option value="DEFAULT" selected>Choose tag</option>
          {selects.tags?.map((tag) => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
            
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