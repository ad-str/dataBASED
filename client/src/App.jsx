import { NavBar } from "./components/NavBar";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import pages
import HomePage from "./pages/HomePage";
import ArtAtlas from "./pages/ArtAtlas";
import Nameless from "./pages/Nameless";
import StealLike from "./pages/StealLike";
import Welcome from "./pages/Welcome";
import Auth from "./pages/Auth";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { user, authIsReady } = useAuthContext();

  if (!authIsReady) {
    return null; // Return null while waiting for authIsReady
  }
  return (
    <>
    <BrowserRouter>
        <NavBar />
          <Routes>
            {user ? (
              <>
                {/* Authenticaed routes */}
                <Route path="/" element={<Welcome />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/map" element={<ArtAtlas />} />
                <Route path="/nameless" element={<Nameless />} />
                <Route path="/steal" element={<StealLike />} />
              </>
            ) :(
              <>
                {/* Authention routes */}
                <Route path="/auth" element={<Auth />} />
                <Route path="*" element={<Navigate to="/auth" />} />
              </>
            )}
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
