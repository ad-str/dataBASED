import "../App.css";
import GoogleIcon from "../assets/icon-google.svg";
import FacebookIcon from "../assets/icon-facebook.svg";

import {
  googleProvider,
  facebookProvider, 
  logInWithEmailAndPassword
} from "../firebase/config";
import { useSocialSignup } from "../hooks/useSocialSignup";
import { useAuthContext } from "../context/AuthContext";
import { useState, useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {user} = useAuthContext();
  const navigate = useNavigate();

  const google = useSocialSignup(googleProvider);
  const facebook = useSocialSignup(facebookProvider);

  //useEffect(() => console.log(user), [user]);
  useEffect(() => {
    console.log(user);
    if (user) navigate("/welcome");
  }, [user]);


  const login=()=>{
    //navigate("/welcome");
    logInWithEmailAndPassword(email, password);
  }

  return (
    <div className="min-h-screen flex justify-center p-5 items-center">
      <div className="space-y-5 text-center gap-5">
        <h1 class="pt-12 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
          ArtBased
        </h1>
        <form>
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
            onClick={login}>
                SIGN IN
         </button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
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

export default Auth;