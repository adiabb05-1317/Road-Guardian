import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import './UserLogin.css'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'

export default function UserLogin() {
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const hist=useNavigate();
    const HandleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3001/users/login', { username, password });
          const token=response.data.accessToken;
            localStorage.setItem('token',token);
            alert('Login Successful');
            hist('/detection')
            
            
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      };
  return (
   
    <div className="login-box">
      <h1 style={{color:'white'}}>Welcome Back!</h1>
             <form className="login-form" onSubmit={HandleLogin}>
             <input className="user-login" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input className="password-login" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Log in</button>
      <Link to="/signup">Don't have an account? Sign up here.</Link>
             </form>
    </div>
    
  )
}
