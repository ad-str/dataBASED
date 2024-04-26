import { NavMobile } from "./NavMobile";
import { NavDesktop } from "./NavDesktop";

export const NavBar = () => {
  return (
    <div className="p-3 shadow-lg bg-gray-300 border-b border-bg-gray-300">
      <nav className="container flex items-center justify-between py-1 lg:py-5">
        <span className="text-lg">ArtBased⚡️</span>
        <NavMobile />
        <NavDesktop />
      </nav>
    </div>
  );
};
