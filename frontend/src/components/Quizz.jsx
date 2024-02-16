import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Quizz = ({task}) => {
  const navigate = useNavigate()

  return ( 
    <div
      className='bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer'
      onClick={() => navigate(`/tasks/${task.id}`)}
    >
        <h1 className='font-bold uppercase'> Question: {task.question}</h1>
        <p className='text-slate-400'>Category: {task.category}</p>
        <p className='text-slate-400'>Tag: {task.tag}</p>
    </div>
   );
}

Quizz.propTypes = {
  task: PropTypes.object.isRequired
}
 
export default Quizz;