"use client"

import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FileUploadModal from "./FileUploadModal";
import { useSession } from "next-auth/react";
import { IStudentAdmission } from "@/utilities/admissionTypes";
import createAdmission from "@/actions/admissions/createAdmission";
import admissionStore from "@/store/admissionState";


interface CompProps{
  setNextStep: () => void;
}

export default function AdmissionForm ( props : CompProps) {

  const searchParams = useSearchParams();
  const newRegister = searchParams.get("newUser");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [introModal, setIntroModal] = useState(false);
  const [loading, setloading] = useState(false);
  const {data} = useSession()
   useEffect(() => {
    if (newRegister === "true") {
      setIntroModal(true);
    }
  }, [newRegister]);

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        homeAddress: Yup.string().required('An address is required'),
        dob:Yup.string().required("Add Date of Birth")
      
      });

      const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
      });

      const uploadUser = async (formData:any)=>{
        setloading(true)
        if(data?.user.parent)
        try{
          const parentId = parseInt(data?.user.parent)
          const admissionResponse = await createAdmission(formData, parentId)
          if(admissionResponse?.success==false){
            alert(admissionResponse.message)
            setloading(false)
          }
          else{
            admissionStore.getState().addAdmissionId(admissionResponse.admissionId)
            setloading(false)
            props.setNextStep()
          }
        }
          
          catch{
            setloading(false)
            alert("An Error Occured")
          }
      }
  return (
    <div>
    <form onSubmit={handleSubmit(uploadUser)}>
    <div className="join join-vertical flex max-w-xl">
    {error && <div role="alert" className="alert alert-error max-w-xl">
  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span> {error} </span>
</div>}
    <label className='form-control max-w-xl my-4 join-item'>
           <p className="my-2"> First Name</p>
        <input type="text" placeholder="Type here" className="input input-bordered w-full "  {...register("firstName")}/>
       <p className="text-error text-sm"> {errors.lastName?.message} </p>
        </label>
        <label className='form-control max-w-xl my-4 join-item'>
           <p className="my-2"> Last Name</p>
        <input type="text" placeholder="Type here" className="input input-bordered w-full "  {...register("lastName")}/>
       <p className="text-error text-sm"> {errors.firstName?.message} </p>
        </label>
        <label className='form-control max-w-xl my-4 join-item'>
           <p className="my-2"> Physical Address Address</p>
        <input type="text" placeholder="Type here" className="input input-bordered w-full "  {...register("homeAddress")}/>
       <p className="text-error text-sm"> {errors.homeAddress?.message} </p>
        </label>
        <label className='form-control max-w-xl mt-4 mb-10 join-item'>
        <p className="my-2"> Date of Birth</p>
        <input type="date"  max={"2020-12-31"} placeholder="Type here" className="input input-bordered w-full "  {...register("dob")}/>
        <p className="text-error text-sm"> {errors.dob?.message} </p>
        </label>
        
      <button className="btn btn-success my-10" disabled={loading} type="submit"> Add User Details </button>
        
    </div>
    </form>
    <FileUploadModal isOpen={introModal} onClose={() => setIntroModal(false)} header="Scholary Admissions">
          <div>
  
          <form >
        <p className="text-xl my-4 text-center"> Welcome to scholary admissions, kindly provide the admission data to sent to the respective schools </p>
    
        </form>
           </div>
         </FileUploadModal>
    </div>
  )
}