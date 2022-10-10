import React from 'react'
import './error.scss'

export default function Error({message}) {
  return (
    <div className='error-container'>
        <p className='error-message'>{message}</p>
    </div>
  )
}
