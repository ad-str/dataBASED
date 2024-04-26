import "../App.css";
import GoogleIcon from "../assets/icon-google.svg";
import FacebookIcon from "../assets/icon-facebook.svg";


import {
  googleProvider,
  facebookProvider,
} from "../firebase/config";
import { useSocialSignup } from "../hooks/useSocialSignup";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";

export default function Auth() {
  const google = useSocialSignup(googleProvider);
  const facebook = useSocialSignup(facebookProvider);

  const { user } = useAuthContext();

  useEffect(() => console.log(user), [user]);

  return (
    <div className="min-h-screen flex justify-center p-5 items-center">
      <div className="space-y-5 text-center gap-5">
        <h1 className="lg:text-4xl text-2xl  font-bold">
          ArtBased
        </h1>
        <p className="max-w-lg text-sm leading-6">
          This was created to highlight the countless artists that don't get the recognition 
          they deserve. We see you and we honor you.
        </p>
        <h2 className="lg:text-4xl text-2xl  font-bold">
          Sign Up or Sign In
        </h2>
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