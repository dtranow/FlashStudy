import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute: React.FC = () => {
  const jwt = localStorage.getItem('token')
    return (
        jwt ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoute