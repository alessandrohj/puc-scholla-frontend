import React from 'react'
import './profile.scss'
import Header from '../../components/global/header/Header'
import Navbar from '../../components/navbar/Navbar'
import { useContext } from 'react'
import UserContext from '../../components/scripts/UserContext'

export default function Profile() {
    const {removeCookie, setRole} = useContext(UserContext)

    return (
        <div className='profile'>
            <Header title='Your Profile' section='profile' />
            <button onClick={()=>removeCookie('scholla', setRole(null))}>Logout</button>
            <Navbar />
            </div>
      )
}
