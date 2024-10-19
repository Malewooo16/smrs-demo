"use client"

import {useFormStatus} from "react-dom"; //use in dev

export default function LoadingBackDrop() {
   const {pending} = useFormStatus();
   //const pending = true;
  return (
  <div className={`${pending ? "" : "hidden"} relative h-full w-full`}>
    <h1 className="text-2xl relative top-[-200px] left-[500px] flex items-center z-20">Loading <span className="loading loading-spinner loading-2xl mx-4"></span></h1>
      <div className={`${!pending ? "" : "fixed z-10"} w-screen left-0 top-0 h-full flex items-center justify-center bg-gray-950 opacity-70`}>
        
        </div>
  </div>
  )
}
