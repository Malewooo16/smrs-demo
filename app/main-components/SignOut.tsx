"use client"


import { signOut } from "next-auth/react";
import { RxExit } from "react-icons/rx";



export default function SignOut() {
   
    
  return (

    
    <button className={` btn hover:btn-error hover:outline-0 pt-4 ps-0 `} onClick={() => signOut({
        redirect:true,
        callbackUrl:`${window.location.origin}/login`
    })}>
      <span className="text-lg">
        <RxExit />
      </span>
      Sign Out 
    </button>
  );
}

