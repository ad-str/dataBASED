import { NavBar } from "../components/NavBar";
import { useNavigate } from "react-router-dom";


function Welcome() {
    const navigate = useNavigate()

  const goHome=()=>{
    navigate("/home");
  }
  return (
    <div className="min-h-screen flex justify-center p-5 items-center">
      <NavBar />
      <div className="space-y-5 text-center gap-5">
        <h1 className="lg:text-4xl text-2xl  font-bold">
          Welcome to ArtBased
        </h1>
        <p className="max-w-lg text-sm leading-6">
          This was created to highlight the countless artists that don't get the recognition 
          they deserve. We see you and we honor you.
        </p>
        <button onClick={() => goHome()} className="px-5 py-3 bg-neutral-300 rounded-md text-sm text-stone-800">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Welcome;