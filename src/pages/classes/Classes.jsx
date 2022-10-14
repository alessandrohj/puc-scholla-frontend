import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/global/header/Header'
import './classes.scss'

export default function Classes() {
  return (
    <div className='classes'>
        <Header title='Your Classes' section='classes' />
        <Navbar />
        </div>
  )
}
