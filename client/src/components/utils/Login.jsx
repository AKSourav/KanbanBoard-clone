import React, { useState } from 'react'
import { baseURL } from '../../api';
import axios from 'axios';

import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Login = ({navigate}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async (e) => {
		e.preventDefault();
		try{
            const {data}=await axios.post(baseURL+'/api/user/login/',{email_username:username,password});
            if(data)
            {
                localStorage.setItem('profile',JSON.stringify(data));
                navigate('/home');
            }
            else
            {
                toast.warning('Error occurred!', {
                    position: toast.POSITION.TOP_RIGHT,
                  })
            }
        }catch(error){
            console.log("Error:",error.message);
            toast.warning(error.response?.data?.message, {
                position: toast.POSITION.TOP_RIGHT,
              })
        }
	};
  return (
    <>
        <div className='login__container'>
            <ToastContainer/>
            <form className='login__form' onSubmit={handleLogin}>
                <label htmlFor='username'>Username:</label>
                <input
                    type='text'
                    name='username'
                    id='username'
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button>SIGN IN</button>
            </form>
        </div>
    </>
  )
}

export default Login