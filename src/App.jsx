import { Navigate, Route, Routes } from 'react-router-dom'
import { useState } from 'react';
import {useCookies} from 'react-cookie'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import UserContext from './components/scripts/UserContext'
import './App.scss'
import Home from './pages/home/Home';
import Protected from './components/protected/Protected';
import Classes from './pages/classes/Classes';
import NotFound from './pages/404';
import Assignments from './pages/assignments/Assignments';
import Profile from './pages/profile/Profile';

function App() {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['scholla'])
  const globalData = {user, setUser, role, setRole, cookies, setCookie, removeCookie}

  return (
    <UserContext.Provider value={globalData}>
    <div className="App">
      <Routes>
        <Route exact path='/' element={!cookies.scholla ? <Login /> : <Navigate to='/home' />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Protected isLoggedIn={cookies.scholla} component={<Home />} />} />
        <Route path='/classes' element={<Protected isLoggedIn={cookies.scholla} component={<Classes />} />} />
        <Route path='/assignment' element={<Protected isLoggedIn={cookies.scholla} component={<Assignments />} />} />
        <Route path='/profile' element={<Protected isLoggedIn={cookies.scholla} component={<Profile />} />} />
        <Route path='*' element={NotFound} />
      </Routes>
    </div>
  </UserContext.Provider>
  )
}

export default App
