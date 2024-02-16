import { Link } from 'react-router-dom'

const Navigation = () => {

  return (
    <div className='pb-8'>
      <div className='grid grid-cols-5 gap-10 py-3'>
        <Link className='col-start-2' to='/tasks'>
          <h1 className='font-bold text-3xl'>Quizz App</h1>
        </Link>
        <div className='place-self-end'>
          <button className='bg-blue-500 px-3 rounded-lg h-12'>
            <Link to='/quizz'>Pass Quiz</Link>        
          </button>      
        </div>
        <div className='place-self-end'>
          <button className='bg-indigo-500 px-3 rounded-lg h-12'>
            <Link to='/tasks-create'>Add Question</Link>        
          </button>      
        </div>
      </div>
    </div>
  );
}
 
export default Navigation;