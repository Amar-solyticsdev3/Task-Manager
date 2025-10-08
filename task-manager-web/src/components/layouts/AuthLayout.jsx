import React from 'react'
import UI_IMG from "../../asserts/images/login_in.png";
const AuthLayout = ({children}) => {
  return (
    <div className='flex'>
        <div className='w-screen h-screen md:w-[60%] px-12 pt-8 pb-12'> 
            <h2 className='text-3xl font-bold text-orange-600'>Task Manager</h2>
            {children}
        </div>
        <div className='hidden md:flex w-[40%] h-screen items-center justify-center overflow-hidden p-8'>
            <img className='w-full h-full object-cover ' src={UI_IMG}/>
        </div>
    </div>

  )
}

export default AuthLayout