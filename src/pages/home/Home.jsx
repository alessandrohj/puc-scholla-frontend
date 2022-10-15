import React from 'react'
import { useContext, useEffect } from 'react'
import UserContext from '../../components/scripts/UserContext'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/global/header/Header'
import { Navigate } from 'react-router-dom'
import './home.scss'

export default function Home() {
    const {setUser, user, cookies, removeCookie} = useContext(UserContext)

    const getUserData = () => {
        const url = "https://puc-scholla-backend-production.up.railway.app/auth/users/me";
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.scholla}`
            }})
            .then((res) => res.json())
            .then(({data}) => {
               setUser(data)
               console.log(data)
            })
            .catch((err) => {
                console.log(err)
                removeCookie('scholla')
                Navigate('/')
            })
    }


    useEffect(() => {
        getUserData()
        }, [])

     return (
    <div className='home'>
   {user && <Header title={`Welcome, ${user.firstName}`} section='welcome' />}
        <Navbar />
    </div>
  ) 
}
