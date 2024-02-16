import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import TasksPage from './pages/TasksPage'
import QuizzPage from './pages/QuizzPage'

import TasksFormPage from './pages/TasksFormPage'
import TasksAnswerPage from './pages/TasksAnswerPage'
import Navigation from './components/Navigation'
import {Toaster} from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter>
      <div className='container max-w-4xl mx-auto'>
        <Navigation/>
        <Routes>
          <Route path='/' element={<Navigate to='/tasks'/>}/>
          <Route path='/tasks' element={<TasksPage />} />
          <Route path='/quizz' element={<QuizzPage/>}/>
          <Route path='/tasks-create' element={<TasksFormPage/>}/>
          <Route path='/tasks/:id' element={<TasksAnswerPage/>}/>
        </Routes>
        <Toaster position="bottom-right" reverseOrder={false}/>
      </div>
    </BrowserRouter>
  )
}

export default App
