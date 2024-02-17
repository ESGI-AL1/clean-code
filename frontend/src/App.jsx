import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import CardsPage from './pages/CardsPage'
import QuizzPage from './pages/QuizzPage'

import CardsFormPage from './pages/CardsFormPage'
import CardsAnswerPage from './pages/CardsAnswerPage'
import Navigation from './components/Navigation'
import {Toaster} from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter>
      <div className='container max-w-4xl mx-auto'>
        <Navigation/>
        <Routes>
          <Route path='/' element={<Navigate to='/cards'/>}/>
          <Route path='/cards' element={<CardsPage />} />
          <Route path='/quizz' element={<QuizzPage/>}/>
          <Route path='/cards-create' element={<CardsFormPage/>}/>
          <Route path='/cards/:id' element={<CardsAnswerPage/>}/>
        </Routes>
        <Toaster position="bottom-right" reverseOrder={false}/>
      </div>
    </BrowserRouter>
  )
}

export default App
