import React, {useState, useContext} from 'react'
import Header from '../../components/global/header/Header'
import UserContext from '../../components/scripts/UserContext'
import Navbar from '../../components/navbar/Navbar'

export default function Users() {
    const {role} = useContext(UserContext)
    const [schools, setSchools] = useState([])
    if (role !== 'super') {
        return <h1>Not Authorized</h1>
    } else {

  return (
    <div className='users'>
        <h1>Manager Users</h1>
    <div className='users-container'>
    <div className='users-container-header'>
        <h3>Add User</h3>
        <div className='users-container-header-inputs'>
            <input type='text' placeholder='First Name' />
            <input type='text' placeholder='Last Name' />
            <input type='text' placeholder='Email' />
            <input type='text' placeholder='Password' />
            <input type='text' placeholder='Confirm Password' />
            <select name='role' id='role'>
                <option value='admin'>Admin</option>
                <option value='teacher'>Dean</option>
                <option value='student'>Super</option>
            </select>
            <select name='school' id='school'>
                {
                    schools ? schools.map((school) => {
                        return <option value={school.id}>{school.name}</option>
                    }
                    ) :
                    <option value=''>No Schools</option>
                }
            </select>
            <button>Add User</button>
            </div>
            </div>
    </div>

    </div>
  )
            }
}