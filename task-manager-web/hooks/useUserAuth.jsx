import { useEffect } from "react";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export const useUserAuth = () => {
  // Your custom hook logic here
  const{user} = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(()=>{
      if (user === undefined) return; // wait until user is loaded

    if(!user){
        navigate('/login');
        return;
    }
     
  },[user,navigate]);
    return {user};
}