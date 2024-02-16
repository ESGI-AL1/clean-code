import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const TaskCard = ({task}) => {
  const navigate = useNavigate()

  return ( 
    <div
      className='bg-zinc-800 p-3 hover:bg-zinc-700'
    >
        <h1 className='font-bold uppercase'> Question: {task.question}</h1>
      <p className='text-slate-400'>Answer: {task.answer}</p>
      <p className='text-slate-400'>Category: {task.category}</p>
      <p className='text-slate-400'>Tag: {task.tag}</p>
      </div>
   );
}

TaskCard.propTypes = {
  task: PropTypes.object.isRequired
}
 
export default TaskCard;