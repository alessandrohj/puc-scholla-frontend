import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import IconExpand from '../../assets/icons/IconExpand'
import Button from '../../components/global/button/Button'
import './signup.scss'
import colors from '../../components/global/styles/variables.module.scss'


export default function SignUp() {

  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedRole, setSelectedRole] = useState('I am a...')

  const roles = ['Student', 'Teacher', 'Parent']

  function expandRole() {
    setIsExpanded(!isExpanded)
    console.log('clicked');
  }

  const rotate = {
    transform: 'rotate(180deg)',
    transition: 'transform 0.5s ease-in-out'
  }
  const rotate2 = {
    transform: 'rotate(0deg)',
    transition: 'transform 0.5s ease-in-out'
  }

  return (
    <div className='signup'>
      <h1 className='signup-title'>Welcome to Scholla</h1>
      <div className='signup-input'>
      <input className='signup-input-field' placeholder='School Name' type='text' />
      <div className='signup-input-container'>
        <span className='signup-input-container-icon' onClick={expandRole} style={isExpanded ? rotate : rotate2} >
          <IconExpand />
        </span>
      <div className={!isExpanded ? 'signup-dropdown' : 'signup-dropdown expanded'}>
       {
        !isExpanded ? 
        <p className='signup-dropdown-role-selected'>{selectedRole}</p> :
        <p className='signup-dropdown-role-expanded'>I am a...</p>
       }
        {
          isExpanded && (
            <div className='signup-dropdown-role-list'>
                          <hr className='signup-dropdown-divider'></hr>
              {
                roles.map((role, index) => (
                  <p className='signup-dropdown-role-list-option' key={index} onClick={() => (setSelectedRole(role), setIsExpanded(false))}>{role}</p>
                ))
        }
  </div>
  )
      }
     </div>
      </div>
      </div>
      <Link to={'/'} className='signup-button'>
      <Button title={'Cancel'} font={'white'} background={colors.red}/>
      </Link>
    </div>
  )
}
