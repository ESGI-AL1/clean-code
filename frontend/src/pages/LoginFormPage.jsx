import {useForm} from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { loginUser } from '../api/auth.api';
import { toast } from 'react-hot-toast';

const LoginFormPage = () => {
  const {register, handleSubmit, setValue, formState: {
    errors
  }} = useForm();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (!params.id) {
      setValue('username', '');
      setValue('password', '');
      return
    }

    const loadTask = async () => {
      const {data} = await getCard(params.id);
      setValue('username', data.username);
      setValue('password', data.password);
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
    console.log(data)
      const res = await loginUser(data)
      console.log("token",res.data.access_token)
      localStorage.setItem('token', res.data.access_token)

      toast.success('login succes', {
        style: {
          background: '#101010',
          color: '#fff',
        }
      })
    

    navigate('/cards');
    window.location.reload(); 
  });

  return (
    <div className='max-w-xl mx-auto'>
      <form onSubmit={onSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          {...register('username', {required: true})}
          className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
        />
        {errors.username && <span>Username is required</span>}

        <input 
          name="password" type="password"
          placeholder="Password" 
          {...register('password', {required: true})}
          className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
        />
        {errors.password && <span>Password is required</span>}

        <div className='flex justify-between gap-4'>
        <button
          className='bg-indigo-500 p-3 rounded-lg w-full mt-3'
        >
          Sign In
        </button>
          
        </div>
      </form>      
    </div>
  );
}
 
export default LoginFormPage;