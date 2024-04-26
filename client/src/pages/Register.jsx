import React, { useEffect, useState } from 'react'
import { useAuthContext } from "../context/AuthContext";
import { registerWithEmailAndPassword } from '../firebase/config';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const {user} = useAuthContext();

  const navigate = useNavigate();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
    navigate("/auth");
  };

  useEffect(() => console.log(user), [user]);

  return (
    <div className="min-h-screen flex justify-center p-5 items-center">
      <div className="space-y-5 text-center gap-5">
        <h1 class="pt-12 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
            ArtBased
          </h1>
        <form >
        <div className="text_area">
            <input
              type="text"
              placeholder="Your Name"
              required
              value={name}
              className="text_input"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="text_area">
            <input
              type="email"
              placeholder="Your Email"
              required
              value={email}
              className="text_input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="text_area">
            <input
              type="password"
              placeholder="Your Password"
              required
              value={password}
              className="text_input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            className="btn"
            onClick={register}>
                SIGN UP
         </button>
        </form>
        <p>Already have an account? <Link to="/auth">Login</Link></p>
      </div>
    </div>
  )
}

export default Register