import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import './UserSignup.css'
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'
export default function UserSignup() {
    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')
    const hist=useNavigate()
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            const res=await axios.post('http://localhost:3001/users/signup',{username,password});
            console.log(res.data)
            hist('/')


        }
        catch(error){
            console.log(error)
        }
    }
  return (
    <div className="signup-box">
      <h1 style={{color:'white'}}> Register Here!</h1>
           <form className="signup-form" onSubmit={handleSubmit}>
                 <input className="signup-user" type="text"placeholder='username' value={username} onChange={(e)=>setUsername(e.target.value)}></input>
                <input className="btn-login" type="password" placeholder="*********" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <button className="btn-signup" type="submit">Signup</button>
                <Link to="/login" style={{color:'white'}}>Already have an account ?Login here!</Link>
           </form>
    </div>
  )
}
