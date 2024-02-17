import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Card = ({card}) => {
  const navigate = useNavigate()

  return ( 
    <div
      className='bg-zinc-800 p-3 hover:bg-zinc-700'
    >
        <h1 className='font-bold uppercase'> Question: {card.question}</h1>
      <p className='text-slate-400'>Answer: {card.answer}</p>
      <p className='text-slate-400'>Category: {card.category}</p>
      <p className='text-slate-400'>Tag: {card.tag}</p>
      <p className='text-slate-400'>Last Answered: {card.last_answered}</p>
      </div>
   );
}

Card.propTypes = {
  card: PropTypes.object.isRequired
}
 
export default Card;