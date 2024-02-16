import {useForm} from 'react-hook-form';
import { createTask, updateTask } from '../api/tasks.api';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteTask } from '../api/tasks.api';
import { useEffect } from 'react';
import { getTask } from '../api/tasks.api';
import { toast } from 'react-hot-toast';

const TasksFormPage = () => {
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
      setValue('answer', data.answer);
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
      await updateTask(params.id, data);      
      toast.success('Task updated successfully', {
        style: {
          background: '#101010',
          color: '#fff',
        }
      })
    } else {
      await createTask(data)
      toast.success('Task created successfully', {
        style: {
          background: '#101010',
          color: '#fff',
        }
      })
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
        />
        {errors.question && <span>Question is required</span>}

        <textarea 
          name="answer" id="desc" cols="30" rows="10" 
          placeholder="Answer" 
          {...register('answer', {required: true})}
          className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
        />
        {errors.answer && <span>Answer is required</span>}

        <input 
          type="text" 
          placeholder="Tag" 
          
        
          {...register('tag', {required: true})}
          className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
          readonly />
        {errors.tag && <span>Tag is required</span>}

        <div className='flex justify-between gap-4'>
        <button
          className='bg-indigo-500 p-3 rounded-lg w-full mt-3'
        >
          Save
        </button>
          {params.id && (
              <button
                className='bg-red-500 p-3 rounded-lg w-48 mt-3'
                onClick={async () => {
                  const accepted = window.confirm('Are you sure?');
                  if (accepted) {
                    await deleteTask(params.id);
                    navigate('/tasks');
                    toast.success('Task deleted successfully', {
                      style: {
                        background: '#101010',
                        color: '#fff',
                      }
                    })
                  }
                }}
              >
                Delete
              </button>
          )}  
        </div>
      </form>      
    </div>
  );
}
 
export default TasksFormPage;