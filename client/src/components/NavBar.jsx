import { NavMobile } from "./NavMobile";
import { NavDesktop } from "./NavDesktop";

export const NavBar = () => {
  return (
    <div className="p-3 shadow-lg bg-sky-200 border-b border-sky-300">
      <nav className="container flex items-center justify-between py-1 lg:py-5">
        <span className="text-lg">ArtBased⚡️</span>
        <NavMobile />
        <NavDesktop />
      </nav>
    </div>
  );
};

