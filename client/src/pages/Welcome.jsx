import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";


export default function Welcome () {
    const navigate = useNavigate();
    const { user } = useAuthContext();

  
    useEffect(() => {
        console.log(user);
        
    }, [user]); 

    const goHome=()=>{
        navigate("/home");
    }

  return (
    <div className="min-h-screen flex justify-center p-5 items-center">
      <div className="space-y-5 text-center gap-5">
        <h1 class="pt-12 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black"> 
        Welcome</h1>
        {user && (
            <>
            <div className="user">
                <p> You&apos;re logged in as: </p>

                <span>{user.displayName} </span>
            </div>

            <input
            type="submit"
            value="CONTINUE"
            className="btn"
            onClick={() => goHome()}
            />
           
            </>
        )}
        </div>
    </div>
  );
}