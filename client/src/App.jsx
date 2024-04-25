import { NavBar } from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import pages
import HomePage from "./pages/HomePage";
import ArtAtlas from "./pages/ArtAtlas";
import Nameless from "./pages/Nameless";
import StealLike from "./pages/StealLike";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <>
    <BrowserRouter>
        <NavBar />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/map" element={<ArtAtlas />} />
            <Route path="/nameless" element={<Nameless />} />
            <Route path="/steal" element={<StealLike />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
