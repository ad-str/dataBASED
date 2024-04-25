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
            className="fixed left-0 shadow-4xl right-0 top-[3.5rem] p-5 pt-0 bg-neutral-950 border-b border-b-white/20"
          >
            <ul className="grid gap-2">
            <NavLink to="/home" className="flex items-center gap-1 hover:text-neutral-400 transition-all"
          > ArtBased </NavLink>
          <NavLink to="/map" className="flex items-center gap-1 hover:text-neutral-400 transition-all"
          > Art Map </NavLink>
          <NavLink to="/nameless" className="flex items-center gap-1 hover:text-neutral-400 transition-all"
          > Nameless Artists </NavLink>
          <NavLink to="/steal" className="flex items-center gap-1 hover:text-neutral-400 transition-all"
          > Steal Like An Artist </NavLink>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};