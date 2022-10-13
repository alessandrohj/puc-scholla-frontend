import { Navigate, Route, Routes } from 'react-router-dom'
import { useState } from 'react';
import {useCookies} from 'react-cookie'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import UserContext from './components/scripts/UserContext'
import './App.scss'
import Home from './pages/home/Home';
import Protected from './components/protected/Protected';

function App() {
  const [user, setUser] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['scholla'])
  const globalData = {user, setUser, cookies, setCookie, removeCookie}

  return (
    <UserContext.Provider value={globalData}>
    <div className="App">
      <Routes>
        <Route exact path='/' element={!cookies.scholla ? <Login /> : <Navigate to='/home' />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Protected isLoggedIn={cookies.scholla} component={<Home />} />} />
      </Routes>
    </div>
  </UserContext.Provider>
  )
}

export default App
