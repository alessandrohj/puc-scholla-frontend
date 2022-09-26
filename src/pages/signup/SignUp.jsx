import React from 'react'
import { Link } from 'react-router-dom'
import IconExpand from '../../assets/icons/IconExpand'
import Button from '../../components/global/button/Button'
import './signup.scss'
import colors from '../../components/global/styles/variables.module.scss'

export default function SignUp() {
  return (
    <div className='signup'>
      <h1 className='signup-title'>Welcome to Scholla</h1>
      <div className='signup-input'>
      <input className='signup-input-field' placeholder='School Name' type='text' />
      <div className='signup-input-container'>
        <span className='signup-input-container-icon'>
        <IconExpand  />
        </span>
      <input id='role' className='signup-input-field' placeholder='I am a...' type='text' />
      </div>
      </div>
      <Link className='signup-button'>
      <Button title={'Cancel'} font={'white'} background={colors.red}/>
      </Link>
    </div>
  )
}
