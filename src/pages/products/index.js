import React from 'react'
import LogoutButton from '../components/logoutButton'

function Products() {
    const logOutAction = (e) => {
        e.preventDefault() 
        
        localStorage.removeItem("@Login")
        localStorage.removeItem("userData")
    }
  return (
    <>
        
        <div>
            <LogoutButton />
        </div>
    </>
    
  )
}

export default Products