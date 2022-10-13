import { Navigate, redirect, Route, Routes } from 'react-router-dom'
import { useState } from 'react';
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import UserContext from './components/scripts/UserContext'
import './App.scss'
import Home from './pages/home/Home';
import Protected from './components/protected/Protected';

function App() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const globalData = {token, setToken, user, setUser}

  return (
    <UserContext.Provider value={globalData}>
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Protected isLoggedIn={token} component={<Home />} />} />
      </Routes>
    </div>
  </UserContext.Provider>
  )
}

export default App
