import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate()

    const [invalid, setInvalid] = useState(false)
    const [user, setUser] = useState()
    const [loginForm, setLoginForm] = useState({
        userName : "",
        password : ""
    })
    const loginAction = (e) => {
        e.preventDefault();
        axios({
            method: "GET",
            url: "https://65a65bf674cf4207b4efd4dc.mockapi.io/api/v1/user"
        })
        .then(res => {
            res.data.map(item => {
                if(item.username === loginForm.userName && item.password === loginForm.password) {
                    localStorage.setItem("@Login", "true")
                    localStorage.setItem('userData', JSON.stringify(item))
                    navigate("/products")
                    
                }
                else(setInvalid(true))
            })
            
        })
        .catch(err => err)

        if(localStorage.getItem("@Login")) navigate("/products")
    }
    
    console.log(loginForm)
  return (
    <>
    <div className=''>
            {/* Form for Login */}
            <form className='mx-auto sm:w-80 px-2 py-5 card'>

                {/* Username */}
                <div className='flex flex-col'>
                    <label>Username</label>
                    <input onChange={(e)=> {
                        setLoginForm({...loginForm, userName: e.target.value})
                    } } type='text' placeholder='username' className='original-border'/>
                </div>
                {/* Password */}
                <div className='flex flex-col mt-3'>
                    <label>
                        Password
                    </label>
                    <input onChange={(e)=> {
                        setLoginForm({...loginForm, password: e.target.value})
                    } } type='password' placeholder='password' className='original-border'/>
                </div>
                {invalid ? 
            <p className='bg-red-300 text-red-500 px-3 py-2 mt-2 rounded-md'>*Your username/password invalid</p> : <p></p>}
                {/* login button */}
                <button onClick={loginAction} className='button-primary mx-auto mt-5 flex items-center justify-center'>Login</button>
            </form>
        </div></>
  )
}

export default LoginForm