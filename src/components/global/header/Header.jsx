import React from 'react'
import './header.scss'
import assignment from  '../../../assets/images/assignment.png'
import classes from '../../../assets/images/classes.png'
import newAssignment from '../../../assets/images/newAssignment.png'
import welcome from '../../../assets/images/welcome.png'
import profile from '../../../assets/images/profile.png'

export default function Header({title, section}) {

    const images = {
        assignment: assignment,
        classes: classes,
        newAssignment: newAssignment,
        welcome: welcome,
        profile: profile
    }

    const headerImage = images[section]
   

  return (
    <div className='header'>
        <h1 className='header-title'>{title}</h1>
        <div className='header-image-container'>
        <img  className='header-image' src={headerImage} />
        </div>
    </div>
  )
}
