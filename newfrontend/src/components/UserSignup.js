/* eslint-disable jsx-a11y/img-redundant-alt */
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
            console.log(res.data.token)
            hist('/')


        }
        catch(error){
            console.log(error)
        }
    }
  return (
    <section className="vh-100" style={{backgroundColor: '#eee'}}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{borderRadius: '25px'}}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                    <form className="mx-1 mx-md-4">

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} id="form3Example1c" className="form-control" />
                          <label className="form-label"  htmlFor="form3Example1c">Your Name</label>
                        </div>
                      </div>

                     

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)} id="form3Example4c" className="form-control" />
                          <label className="form-label"  htmlFor="form3Example4c">Password</label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="password" id="form3Example4cd" className="form-control" />
                          <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example3c"
                        />
                        <label className="form-check-label" htmlFor="form2Example3">
                          I agree all statements in{" "}
                          <a href="#!">Terms of service</a>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="button" onClick={handleSubmit} className="btn btn-primary btn-lg">Register</button>
                      </div>

                    <Link to='/login' >Already resgistered !please login Here</Link>
                    </form>

                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                    <img src={"https://thumbs.dreamstime.com/b/road-safety-concept-safety-first-asphalt-centre-lines-yellow-61078977.jpg"}
                      className= "img-fluid" alt={"Sample image"} />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}