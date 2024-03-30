import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Form = ({createUser,isSignUp}) => {
  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const navigate=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(isSignUp){
      await createUser({username,email,password});
      navigate('/login');
    }
    else{
      await createUser({email,password});
      navigate('/');
    }
    setUsername('');
    setEmail('');
    setPassword('');
  }


  return (
    <div className="container bg-info p-4 text-light rounded">
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <div className="form-group mb-2">
            <label>Username</label>
            <input className='form-control mt-2' type="text" placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
          </div>
        )}
        <div className="form-group mb-2">
          <label>Email</label>
          <input className='form-control mt-2' type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="form-group mb-2">
          <label>Password</label>
          <input className='form-control mt-2' type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <button type='submit' className='btn btn-primary mt-2'>{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>
    </div>
  )
}

export default Form;