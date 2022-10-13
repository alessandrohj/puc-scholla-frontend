import React from 'react'
import { useContext, useEffect } from 'react'
import UserContext from '../../components/scripts/UserContext'

export default function Home() {
    const {token, setUser, user, cookies} = useContext(UserContext)

    const getUserData = () => {
        const url = "http://localhost:3000/auth/users/me";
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.token}`
            }})
            .then((res) => res.json())
            .then(({data}) => {
               setUser(data)
               console.log(data)
            })
    }


    useEffect(() => {
        getUserData()
        }, [])

     return (
    <div className='home'>
        {user &&  <div>
        <div className='home-header'>
        <h1>Welcome {user.firstName}</h1>
        <p>icon</p>
        </div>
        <div className='home-content'>
        <div className='home-content-classes'>
            <h2>Classes</h2>
            <div className='home-content-classes-list'>
            <div className='home-content-classes-list-item'>
                <p>Class 1</p>
                <p>icon</p>
                </div>
                </div>
        </div>
        </div>
        </div>}
    </div>
  ) 
}
