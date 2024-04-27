"use client"

import { useState } from "react";
import Image from 'next/image'
import admissionStore from "@/store/admissionState";
import userPicUpload from "@/actions/admissions/pictureUpload";
import ServerBtn from "./ServerBtn";


export default function UserPicUpload(props : {setNextStep : ()=> void}) {

   const [base64String, setBase64String] = useState <string | null>('')
   const [error, setError] = useState('')
    const handleFileChange = (event:any) => {
        const file = event.target.files[0];
    
        if (file) {
          // Read the file as a data URL
          const reader = new FileReader();
    
          reader.onloadend = () => {
            // Set the Base64 string in the state
            const base64 = reader.result as string
            setBase64String(base64);
          };
    
          reader.readAsDataURL(file);
        }

       
      };

      const picUpload =async(formData :FormData) =>{
        const admissionId = admissionStore.getState().admissionId
        try{
          const userPicResponse = await userPicUpload(formData, admissionId)
          if(userPicResponse?.success===false){
            alert(userPicResponse.message)
          }
          else{
            props.setNextStep()
          }
        }
        catch{
          alert("An error occured")
        }
      }
 

  return (
    <div>
  
{error && <div role="alert" className="alert alert-error">
  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span> {error} </span>toFinalStep
toFinalStep
</div>}
        <h2 className="text-lg my-4">Upload User Pic</h2>
        <form action={picUpload} className="max-w-lg">
        {/* <p> {userId} </p> */}
        <input type="file" className="file-input file-input-bordered w-full" accept="image/*" name="userPic" onChange={handleFileChange} required />
        <p>Preview:</p>
        {base64String && <Image className="my-4" src={base64String} alt="preview" width={250} height={250} /> }
        <ServerBtn/>
        </form>
    </div>
  )
}
