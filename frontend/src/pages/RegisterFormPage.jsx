import {useForm} from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { createUser } from '../api/auth.api';
import { toast } from 'react-hot-toast';

const ResgisterFormPage = () => {
    const {register, handleSubmit, setValue, formState: {
        errors
    }} = useForm();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (!params.id) {
        setValue('username', '');
            setValue('password', '');
            setValue('last_name', '');
            setValue('first_name', '');
        return
        }

        const loadTask = async () => {
        const {data} = await getCard(params.id);
        setValue('username', data.username);
            setValue('password', data.password);
            setValue('first_name', data.first_name);
            setValue('last_name', data.last_name);
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
        const res = await createUser(data)
    

        toast.success('user create succes', {
            style: {
            background: '#101010',
            color: '#fff',
            }
        })
        

        navigate('/login');
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
        type="text" 
        placeholder="First Name" 
        {...register('first_name', {required: true})}
        className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
        />
        {errors.first_name && <span>First Name is required</span>}
        <input 
        type="text" 
        placeholder="last Name" 
        {...register('last_name', {required: true})}
        className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
        />
        {errors.first_name && <span>Last Name is required</span>}

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
        Register
        </button>
        
        </div>
    </form>      
    </div>
  );
}
 
export default ResgisterFormPage;