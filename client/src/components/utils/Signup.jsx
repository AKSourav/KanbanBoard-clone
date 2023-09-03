import React, { useState } from 'react'
import { baseURL } from '../../api';
import axios from 'axios';

import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Signup = ({navigate}) => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password!=confirmpassword)
        {
            toast.warning('Password and Confirm Password should be same', {
                position: toast.POSITION.TOP_RIGHT,
              })
            return;
        }
		try{
            const {data}=await axios.post(baseURL+'/api/user',{username,name,email,password});
            if(data)
            {
                localStorage.setItem('profile',JSON.stringify(data));
                navigate('/home');
            }
            else
            {
                toast.warning('Error occurred!', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }
        }catch(error){
            console.log("Error:",error);
            toast.warning(error.response?.data?.message, {
                position: toast.POSITION.TOP_RIGHT,
              })
        }
	};
  return (
    <>
        <div className='login__container'>
            <ToastContainer/>
            <form className='login__form' onSubmit={handleSubmit}>
                <label htmlFor='username'>Create Username:</label>
                <input
                    type='text'
                    name='username'
                    id='username'
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <label htmlFor='name'>Enter Fullname:</label>
                <input
                    type='text'
                    name='name'
                    id='name'
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <label htmlFor='email'>Enter email:</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <label htmlFor='password'>Create new Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <label htmlFor='confirmpassword'>Create new Password</label>
                <input
                    type='password'
                    name='confirmpassword'
                    id='confirmpassword'
                    required
                    onChange={(e) => setConfirmpassword(e.target.value)}
                    value={confirmpassword}
                />
                <button>SIGN IN</button>
            </form>
        </div>
    </>
  )
}

export default Signup