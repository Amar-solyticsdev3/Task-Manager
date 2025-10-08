import React, { useState } from 'react';
import { HiOutlineX, HiOutlineMenu } from 'react-icons/hi';
import Sidebar from './Sidebar';

const Navbar = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <div className="flex gap-5 bg-white border-b border-gray-200/50 py-4 px-7 sticky top-0 z-30">
      <button
        className="block lg:hidden text-black"
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-3xl" />
        ) : (
          <HiOutlineMenu className="text-3xl" />
        )}
      </button>
      <h2 className="text-xl font-semibold  text-orange-600 ">Task Manager</h2>
      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
          <Sidebar />
        </div>
      )}
    </div>
  );
};

export default Navbar;
