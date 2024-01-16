import React from 'react'
import { useNavigate } from 'react-router-dom'

function LogoutButton() {

    const navigate = useNavigate()
    const logOutAction = (e) => {
        e.preventDefault() 
        
        localStorage.removeItem("@Login")
        localStorage.removeItem("userData")
        
        navigate("/")
    }
  return (
    <button
        onClick={logOutAction}
        className='button-primary'>Logout</button>
  )
}

export default LogoutButton