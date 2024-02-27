import React from 'react';
import { Link } from 'react-router-dom';

const LoginRegisterButton = () => {

  return (
    <div className='place-self-end'>
      
        <Link to='/register'>
            <button className='bg-indigo-500 px-3 rounded-lg h-12 mr-1'>
              register
            </button>      
        </Link>        
      
      
        <Link to='/login'>
          <button className='bg-indigo-500 px-3 rounded-lg h-12'>
            Login
          </button>      
        </Link>        
      
    </div>
  );
};

export default LoginRegisterButton;