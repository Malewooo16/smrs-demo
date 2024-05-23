"use client"

import { validateAdmission } from "@/actions/admissions/validateAdmission";
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react";
import toast from "react-hot-toast";

export default function BeemPay({selectedClass}:{selectedClass:string}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const admissionId = searchParams.get("addyId") as string;
  const escuela = searchParams.get("escuela");
  const [loading, setloading] = useState(false)

  const handleConnectToStudent = async()=>{
     setloading(true)
      try{
        const admissionSuccess = await validateAdmission(escuela, admissionId, selectedClass);
        if(admissionSuccess.success===true){
          toast.success(admissionSuccess.message)
          setloading(false)
      setTimeout(()=>{
        router.push("/padmissions")
      }, 100)
        }
        else{
          toast.error(admissionSuccess.message)
          setloading(false)
        }
      }
      catch{
        toast.error("Error Occured")
        setloading(false)
      }

      
  }
  return (
    <div className='flex flex-col items-center justify-center w-full lg:h-full border lg:max-w-xl my-4 lg:my-0 rounded  px-2'>
        <h1 className="text-2xl font-bold text-center">Beem Pay <br/> Online Transactions Manager</h1>
        <h1 className='text-xl'>Beem Pay Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus veniam, esse pariatur error eos earum aliquam beatae illum, quo officia unde rerum a, explicabo soluta. Impedit aliquid quas sunt reprehenderit.</h1>
        
        <button className="btn btn-success my-4" onClick={handleConnectToStudent}>Connect to School</button>
    </div>
  )
}
