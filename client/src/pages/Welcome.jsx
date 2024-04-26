import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";


function Welcome() {
const { user } = useAuthContext();
const navigate = useNavigate()

  const goHome=()=>{
    navigate("/home");
  }
  return (
    <div className="min-h-screen flex justify-center p-5 items-center">
      <div className="space-y-5 text-center gap-5">
      <h1> Welcome</h1>
      {user && (
        <>
          <div className="user">
            <p> You&apos;re logged in as: </p>

            <span>{user.displayName} </span>
          </div>

          <button onClick={() => goHome()} className="px-5 py-3 bg-neutral-300 rounded-md text-sm text-stone-800">
          Get Started
        </button>
        </>
      )}
        </div>
    </div>
  );
}

export default Welcome;