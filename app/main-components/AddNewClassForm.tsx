"use client"
import { classTypeObject } from "@/utilities/classesInfo";
import { useEffect, useState } from "react";

export default function AddNewClassForm({schoolId}:{schoolId:any}) {
  const [className, setClassName] = useState("")
  const [nameOfClass, setNameOfClass] = useState("");
  useEffect(()=>{
    setNameOfClass(className + " " + new Date().getFullYear().toString());
  }, [className])
  return (
    <div>
      <form>
        <h1 className="text-xl font-bold mb-4">Add a new Class</h1>
        <label>
          <p>Select Class Type</p>
          <select
            title="select Class"
            className="select select-bordered w-full max-w-lg my-4"
            onChange={(e)=>setClassName(e.target.value)}
          >
             <option disabled selected>
                  Select Class Type
                </option>
            {classTypeObject.map((c) => (
              <>
               <option key={c.id} value={c.default} >{c.type}</option>
              </>
            ))}
            
          </select>
        </label>
        <label>
       <div className="my-4"> 
        <p className="text-xl font-semibold">Auto Generated Class Name</p>
        <p className="font-semibold"> {nameOfClass} </p>
       </div>

        </label>
        <button className="btn btn-success my-4">Add Class</button>
      </form>
    </div>
  );
}
