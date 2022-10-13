import React from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import UserContext from '../../components/scripts/UserContext'

export default function Home() {
    const {token} = useContext(UserContext)
    console.log('token', token)
     return (
    <div><h1>Home</h1> <p>{token}</p></div>
  ) 
}
