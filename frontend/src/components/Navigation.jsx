import { Link, Navigate } from 'react-router-dom'
import LogoutButton from './LogoutButton';
import LoginRegisterButton from './LoginRegisterButton';
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Navigation = () => {
  const [isauth, setIsauth] = useState([]);
  
  useEffect(() => {
    const checkAuth = async () => { 
      const token = localStorage.getItem('token');
      if (!token) {
        setIsauth(false);
        return <Navigate to="/login" />;
      } else {
        const decodedToken = jwtDecode(token);
        let currentDate = new Date();
  
        console.log('tokens', decodedToken)
        let isAuthenticated = false;
        // JWT exp is in seconds
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          isAuthenticated = false;
        } else {
          isAuthenticated = true;
        }
        setIsauth(isAuthenticated);
  
      }
    }

    checkAuth();
  }, []);

  return (
    
    <div className='pb-8'>
      <div className='grid grid-cols-6  py-3'>
        <Link className='col-start-1' to='/cards'>
          <h1 className='font-bold text-3xl'>Quizz App { isauth }</h1>
        </Link>
        <div className='place-self-end'>
          
          <Link to='/quizz'>
            <button className='bg-blue-500 px-3 rounded-lg h-12'>
              Pass Quiz
            </button>      
          </Link>        
        </div>
        <div className='place-self-end'>
            <Link to='/cards-create'>
                <button className='bg-blue-500 px-3 rounded-lg h-12'>
                    Add Question
                </button>      
          </Link>        
        </div>
        {isauth ? <LogoutButton />:  <LoginRegisterButton /> }
      </div>
    </div>
  );
}
 
export default Navigation;