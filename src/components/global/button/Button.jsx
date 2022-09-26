import React from 'react'
import './button.scss'

export default function Button({title, font, background}) {
  return (
    <div className='button-container'>
        <button className='basic-button' style={{backgroundColor: background, color: font}}>{title}</button>
    </div>
  )
}
