import React from 'react'
import Button from '../../components/global/button/Button'
import './login.scss'
import colors from '../../components/global/styles/variables.module.scss'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='login'>
      <h1 className='login-title'>Welcome to Scholla</h1>
      <div className='login-content'>
        <div className='login-content-input'>
          <input className='login-content-input-field' placeholder='Email' type='text'/>
          <input className='login-content-input-field'  placeholder='Password' type='password'/>
          <p className='login-content-input-highlight'>Forgot your password?</p>
        </div>
        <div className='login-content-button'>
        <Button title={"Sign in"} font="white" background={colors.blue}/>
        </div>
        <div className='login-content-footer'>
          <p>Don't have an account yet?</p>
          <Link className='login-content-input-highlight' to="/signup">Click here to create one</Link>
        </div>
      </div>
    </div>
  )
}
