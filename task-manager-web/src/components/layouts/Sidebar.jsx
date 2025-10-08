import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../../utils/userSlice';
import { SIDE_MENU_DATA, SIDE_USER_MENU_DATA } from '../../utils/data';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  //
  const [sideMenuData, setSideMenuData] = useState([]);
  
  const handleClick = (route) => {
    if (route === 'logout' || route === 'loggout') {
      handleLogout();
      return;
    }
    navigate(route);
  };
  const handleLogout = () => {
    dispatch(removeUser());
    navigate('/login');
  };
  useEffect(() => {
    if (user) {
      setSideMenuData(
        user.role === 'admin' ? SIDE_MENU_DATA : SIDE_USER_MENU_DATA
      );
    }
    return () => {};
  }, [user]);
  return (
    <div className="w-65 h-screen border-r border-gray-300 p-5 flex flex-col">
      <div className=" flex flex-col justify-center items-center mb-7 pt-5">
        <div className="relative">
          <img
            src={user.profileImageUrl || ''}
            alt="Profile pic"
            className="w-30 h-30 rounded-full mb-3 bg-slate-400  object-cover"
          />
        </div>
        {user.role === 'admin' && (
          <div className="text-[15px]  bg-primary rounded mt-1 px-3 py-0.5 mb-3 ">
            Admin
          </div>
        )}
        <h5 className="text-gray-950 font-bold leading-5 mt-3">
          {user.firstName || ''}
        </h5>
        <p className="text-gray-500 ">{user.emailId || ''}</p>
      </div>
      {sideMenuData.map((item, index) => (
        <button
          key={index}
          className={`w-full flex justify-center items-center gap-3 text-[15px] hover:bg-blue-300 rounded-xl hover:text-orange-600 py-3 px-6 mb-7  cursor-pointer`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl " />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
