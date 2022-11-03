import React, { useContext } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { AuthContext } from '../context/authContext'

import "../login.css";

const Login = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const{login} =useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    }
    catch (err) {
      setError(err.response.data);
    }
  };


  return (
    // <div className='auth'>
    //   <h1> Login</h1>
    //   <form >
    //     <input required type="text" placeholder='username' name='username' onChange={handleChange} />
    //     <input required type="password" placeholder='password' name='password' onChange={handleChange} />
    //     <button onClick={handleSubmit}>Login</button>
    //     {err && <p>{err}</p>}
    //     <span>Don't you have an account? <Link to="/register">Register</Link>
    //     </span>
    //   </form>
    // </div>

    <div className="box">
      <div className="form">
        <h2>Sign in</h2>
        <div className="inputBox">
          <input type="text" required="required"  name='username' onChange={handleChange}/>
          <span>Username</span>
          <i></i>
        </div>
        <div className="inputBox">
          <input type="password" required="required"  name='password' onChange={handleChange} />
          <span>Password</span>
          <i></i>
        </div>
        {err && <p>{err}</p>}
        <div className="links">
          <a href="#">Forgot password?</a>
          <a href="#">Signup</a>
        </div>
        <input type="submit" value="Login"  onClick={handleSubmit}/>
      </div>
    </div>
  )
}

export default Login
