import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/landing-page/LandingPage'
import RegisterPage from './pages/register-page/RegisterPage'
import LoginPage from './pages/login-page/LoginPage'
import NavBar from './components/nav-bar/NavBar'
import Footer from './components/footer/Footer'
import BoadsPage from './pages/boards-page/BoadsPage'
import NotFoundPage from './pages/not-found-page/NotFoundPage'

function App() {

  return (
    <>
      <NavBar/>
      <div className="relative bg-gray-900 isolate min-h-screen pt-12 ">
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/boards" element={<BoadsPage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App
