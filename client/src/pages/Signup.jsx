import React, { useState } from 'react'
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      const user = userCredential.user;
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen flex justify-center p-5 items-center">
      <div className="space-y-5 text-center gap-5">
        <h1 class="pt-12 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
            ArtBased
          </h1>
          <h2 className="lg:text-4xl text-2xl  font-bold">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
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
          <input
            type="submit"
            value="SIGN UP"
            className="btn"
          />
        </form>
        <p>Need to Login? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}

export default Signup