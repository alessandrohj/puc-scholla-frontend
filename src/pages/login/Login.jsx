import React, {useState, useContext} from 'react'
import Button from '../../components/global/button/Button'
import Error from '../../components/global/error/Error'
import './login.scss'
import colors from '../../components/global/styles/variables.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../../components/scripts/UserContext.js'

export default function Login() {

  const {setCookie} = useContext(UserContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()

  const signIn = () => {
   if (email.length === 0 && password.length === 0) {
      return
    } 
    const url = "http://localhost:3000/auth/tokens";
    // TODO: replace to deployment URL
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
    })})
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          setErrorMessage(data.errors[0].message)
        } else {
          setCookie('scholla', data.data.token, {path: '/'})
          setErrorMessage(null)
          return  navigate('/home')
        }
      })
  }

  return (
    <div className='login'>
      <h1 className='login-title'>Welcome to Scholla</h1>
      <div className='login-content'>
        <div className='login-content-input'>
         {errorMessage && <Error message={errorMessage} />}
          <input className='login-content-input-field' placeholder='Email' type='text' value={email} onChange={(ev) => setEmail(ev.target.value)}/>
          <input className='login-content-input-field'  placeholder='Password' type='password' value={password} onChange={(ev)=> setPassword(ev.target.value)}/>
          <p className='login-content-input-highlight'>Forgot your password?</p>
        </div>
        <div className='login-content-button'>
        <Button title={"Sign in"} font="white" background={colors.blue} handleCLick={signIn}/>
        </div>
        <div className='login-content-footer'>
          <p>Don't have an account yet?</p>
          <Link className='login-content-input-highlight' to="/signup">Click here to create one</Link>
        </div>
      </div>
    </div>
  )
}
