
import { Route } from 'react-router-dom'
import './App.css'
import { Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function App() {
  const location = useLocation();
  useEffect(() => {
    if (localStorage.getItem('connected') === 'true') {
      if (window.location.pathname === '/login' || window.location.pathname === '/register') {
        window.location.href = '/dashboard'
      }
    } else {
      if (window.location.pathname === '/dashboard') {
        window.location.href = '/'
      }
    }
  }, [location])
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
