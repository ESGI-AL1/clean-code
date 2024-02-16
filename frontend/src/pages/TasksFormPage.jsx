import {useForm} from 'react-hook-form';
import { createCard, updateCard } from '../api/cards.api';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getCard } from '../api/cards.api';
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
      const {data} = await getCard(params.id);
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
      await createCard(params.id, data);      
      toast.success('Card updated successfully', {
        style: {
          background: '#101010',
          color: '#fff',
        }
      })
    } else {
      await createCard(data)
      toast.success('Card created successfully', {
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
          
        </div>
      </form>      
    </div>
  );
}
 
export default TasksFormPage;