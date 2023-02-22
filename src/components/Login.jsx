import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function Login() {
  const navigate = useNavigate();
  let users = []
  const [user, setUser] = useState(users)
  if(localStorage.getItem('User')){
    users.push(localStorage.getItem('User'))
  }

  function submitHandler(e){
    e.preventDefault();
    if (
      e.target.name.value === 'Please enter your name' 
    ) 
    {
      alert("Please enter particapant's name");
      return;
    }
    const found = e.target.name.value
    
    {
      if (found){
      const copyUser = [...user]
      copyUser.push(found)
      localStorage.setItem('User', copyUser)
      setUser(copyUser)
      return found
    }
    }
  }
  const bStyle = {
    width: '160px',
    gap: '20px'
  }
  function home() {
    navigate('/home')
  }
  return (
    <div className="card w-96 bg-primary text-primary-content">
  <div className="card-body">
    <h2 className="card-title">New participant</h2>
    <form onSubmit={submitHandler}>
        <input type='text' name='name'
        placeholder='Please enter your name'
        className='input input-bordered w-full max-w-xs'/>
      <button onClick={home} type="submit" className="btn" style={bStyle}>Home/Start</button> 
      <button className="btn" style={bStyle}>Add user</button> 
      </form>
    <div className="card-actions justify-end">
    </div>
  </div>
</div>
  )
}

export default Login