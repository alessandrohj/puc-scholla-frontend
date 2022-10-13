import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Protected({isLoggedIn, component}) {
    return isLoggedIn ? component : <Navigate to={'/'} />
}
