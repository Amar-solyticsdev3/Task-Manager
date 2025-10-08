import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';



const Input = ({ value, onChange, label,placeholder, type }) => {

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div>
      <label className="text-lg text-black">{label}</label>
      <div className="w-full flex justify-center gap-3 text-sm text-black rounded-lg px-4 py-2 mb-5 border border-gray-500 outline-none">
        <input
          className="w-full bg-transparent outline-none"
          value={value}
          type={
            type == 'password' ? (showPassword ? 'text' : 'password') : type
          }
          onChange={(e) => onChange(e)}
          placeholder={placeholder}
        />
        {type === 'password' && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-primary cursor-pointer"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-primary cursor-pointer"
                onClick={toggleShowPassword}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
