import admissionStore from "@/store/admissionState";
import {useState} from 'react'
 import ServerBtn from "./ServerBtn";
import admissionObjectsUpload from "@/actions/admissions/admissionObjectsUpload";
import { useRouter, useSearchParams } from "next/navigation";

export default function ObjectsUplaod(props:{setNextStep:()=>void}) {
 
  const [objects, setObjects] = useState('');
  const uploadAdmissionFiles = async (formData:FormData) =>{
    const admissionId = admissionStore.getState().admissionId;
    try{
      const objectUploadresponse = await admissionObjectsUpload(formData, admissionId)
      if(objectUploadresponse?.success == false){
        alert(objectUploadresponse.message)
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
      <form action={uploadAdmissionFiles}>
        <h1 className="text-lg my-2">Upload the files detailed below</h1>
        <div className="join join-vertical flex max-w-xl">
          <label className="form-control max-w-xl mb-4 join-item">
            <p className="mb-2"> Birth Certificate</p>
            <input
              type="file"
              placeholder="Type here"
              className="file-input file-input-bordered w-full "
              name="objects"
            />
          </label>
          <label className="form-control max-w-xl my-4 join-item">
            <p className="my-2"> School Transcripts</p>
            <input
              type="file"
              placeholder="Type here"
              className="file-input file-input-bordered w-full "
              name="objects"
            />
          </label>
          <label className="form-control max-w-xl mt-4 mb-10 join-item">
            <p className="my-2">
              Medical Records <span className="text-md">(optional)</span>
            </p>
            <input
              type="file"
              className="file-input file-input-bordered w-full "
              name={objects}
              onChange={()=> setObjects("objects")}
              />
          </label>
          <ServerBtn />
        </div>
      </form>
    </div>
  );
}
