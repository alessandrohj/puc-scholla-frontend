import React from 'react'
import './button.scss'

export default function Button({title, font = "white", background, inactive, handleCLick}) {
  return (
    <div className='button-container'>
        {
            inactive ? <button className='basic-button' style={{backgroundColor: 'rgba(128, 128, 128, 0.8)', color: font, opacity: 0.5, cursor: 'not-allowed'}}>{title}</button>
            :
            <button onClick={handleCLick} type='submit' className='basic-button' style={{backgroundColor: background, color: font, cursor: 'pointer'}}>{title}</button>
        }
    </div>
  )
}
