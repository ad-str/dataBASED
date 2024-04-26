import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";


export const NavDesktop = () => {
  const { logout } = useLogout();

  return (
    <div className="hidden lg:flex lg:items-center gap-1 text-lg">
      <NavLink
        to="/home"
        className="border-b-2 border-transparent hover:text-neutral-400 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
      >
        {" "}
        Home
      </NavLink>
      <NavLink
        to="/map"
        className="border-b-2 border-transparent hover:text-neutral-400 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
      >
        {" "}
        Art Atlas{" "}
      </NavLink>
      <NavLink
        to="/nameless"
        className="border-b-2 border-transparent hover:text-neutral-400 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
      >
        {" "}
        Nameless Artists{" "}
      </NavLink>
      <NavLink
        to="/steal"
        className="border-b-2 border-transparent hover:text-neutral-400 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
      >
        {" "}
        Steal Like An Artist{" "}
      </NavLink>
      <NavLink
        className="border-b-2 border-transparent hover:text-neutral-400 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
        onClick={() => logout()}
      >
        {" "}
        Logout{" "}
      </NavLink>
    </div>
  );
};
