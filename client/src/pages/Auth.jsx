import "../App.css";
import GoogleIcon from "../assets/icon-google.svg";
import FacebookIcon from "../assets/icon-facebook.svg";


import {
  auth,
  googleProvider,
  facebookProvider,
} from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useSocialSignup } from "../hooks/useSocialSignup";
import { useAuthContext } from "../context/AuthContext";
import { useState, useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom'

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      const user = userCredential.user;
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }
  const google = useSocialSignup(googleProvider);
  const facebook = useSocialSignup(facebookProvider);

  const { user } = useAuthContext();

  useEffect(() => console.log(user), [user]);

  return (
    <div className="min-h-screen flex justify-center p-5 items-center">
      <div className="space-y-5 text-center gap-5">
        <h1 class="pt-12 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
          ArtBased
        </h1>
        <p>
          This was created to highlight the countless artists that don't get the recognition 
          they deserve. We see you and we honor you.
        </p>
        <h2 className="lg:text-4xl text-2xl  font-bold">
          Sign In
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
            value="SIGN IN"
            className="btn"
          />
      </form>
      <p>Need to Signup? <Link to="/signup">Create Account</Link></p>
      <p> Or login with Google/Facebook</p>
        <button onClick={google.signInWithSocial}>
        <img src={GoogleIcon} alt="" />
        <span>Google</span>
      </button>

      <button onClick={facebook.signInWithSocial}>
        <img src={FacebookIcon} alt="" />
        <span>Facebook</span>
      </button>
      </div>
    </div>
  );
}