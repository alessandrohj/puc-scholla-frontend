import React from 'react'
import './profile.scss'
import Header from '../../components/global/header/Header'
import Navbar from '../../components/navbar/Navbar'

export default function Profile() {
    return (
        <div className='profile'>
            <Header title='Your Profile' section='profile' />
            <Navbar />
            </div>
      )
}
