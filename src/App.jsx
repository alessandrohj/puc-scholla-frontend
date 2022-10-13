import { Route, Routes } from 'react-router-dom'
import { useState } from 'react';
import Navbar from './components/navbar/Navbar'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import UserContext from './components/scripts/UserContext'
import './App.scss'

function App() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const globalData = {token, setToken, user, setUser}

  return (
    <UserContext.Provider value={globalData}>
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  </UserContext.Provider>
  )
}

export default App
