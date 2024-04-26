import { NavMobile } from "./NavMobile";
import { NavDesktop } from "./NavDesktop";

export const NavBar = () => {
  return (
    <div className="p-3 shadow-lg bg-gray-300 border-b border-bg-gray-300">
      <nav className="container flex items-center justify-between py-2 lg:py-5">
        <span className="text-4xl font-extrabold leading-none tracking-tight">
          ArtBased⚡️
        </span>
        <NavMobile />
        <NavDesktop />
      </nav>
    </div>
  );
};
