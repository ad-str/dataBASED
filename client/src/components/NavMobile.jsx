import { useClickAway } from "react-use";
import { useRef } from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";

import { NavLink } from "react-router-dom";

export const NavMobile = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => setOpen(false));

  return (
    <div ref={ref} className="lg:hidden ">
      <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 shadow right-0 top-[4rem] p-4 pt-2 bg-gray-200"
          >
            <ul className="grid gap-2">
              <NavLink
                to="/home"
                className="border-b-2 border-transparent hover:text-neutral-400 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
              >
                {" "}
                Home{" "}
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
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
