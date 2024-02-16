import {useForm} from 'react-hook-form';
import { updateTask } from '../api/tasks.api';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getTask } from '../api/tasks.api';
import { toast } from 'react-hot-toast';

const TasksAnswerPage = () => {
  const {register, handleSubmit, setValue, formState: {
    errors
  }} = useForm();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (!params.id) {
      setValue('question', '');
      setValue('answer', '');
      setValue('tag', '');
      return
    }

    const loadTask = async () => {
      const {data} = await getTask(params.id);
      setValue('question', data.question);
      setValue('answer', "");
      setValue('tag', data.tag);
      setValue('good', data.answer);
    }

    toast.promise(
      loadTask(),
      {
        loading: 'Loading task...',
        success: <b>Task loaded</b>,
        error: <b>Could not load task</b>
      }
    )
  }, [params.id, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      console.log(data)
      if (data.answer == data.good) {
        const data = {
          "isValid":true
        }
        await updateTask(params.id, data);    
        toast.success('Good!', {
          style: {
            background: '#101010',
            color: '#fff',
          }
            
        })
      } else {
        const data = {
          "isValid":false
        }
        await updateTask(params.id, data);    
        toast.error('Bad response', {
          style: {
            background: '#101010',
            color: '#fff',
          }
        })
      }
      
    }

    navigate('/tasks');
  });

  return (
    <div className='max-w-xl mx-auto'>
      <form onSubmit={onSubmit}>
        <input 
          type="text" 
          placeholder="Question" 
          {...register('question', {required: true})}
          className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
          readOnly/>
        {errors.question && <span>Question is required</span>}

        <textarea 
          name="answer" id="desc" cols="30" rows="10" 
          placeholder="Answer" 
          {...register('answer', {required: true})}
          className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
        />
        {errors.answer && <span>Answer is required</span>}


        <div className='flex justify-between gap-4'>
        <button
          className='bg-indigo-500 p-3 rounded-lg w-full mt-3'
        >
          Save
        </button>
          
        </div>
      </form>      
    </div>
  );
}
 
export default TasksAnswerPage;