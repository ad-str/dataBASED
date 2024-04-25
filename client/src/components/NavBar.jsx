import { NavMobile } from "./NavMobile";
import { NavDesktop } from "./NavDesktop";

export const NavBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-neutral-950 border-b border-neutral-700">
      <nav className="container flex items-center justify-between py-1 lg:py-5">
        <span className="text-lg">ArtBased⚡️</span>
        <NavMobile />
        <NavDesktop />
      </nav>
    </div>
  );
};