"use client"

import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import registerNewParent from "@/actions/parents/registerNewParent";
import sendValidationEmailToParent from "@/actions/parents/sendValidationEmailToParent";




interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber:string;
  password:string;
}

export default function RegisterNewParent( ) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const [backdrop, setBackdrop] = useState(false);
 

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('Title is required'),
        lastName: Yup.string().required('Description is required'),
        phoneNumber:Yup.string().required('Phone Number is required'),
        email: Yup.string().required('Collaborators are required'),
        password:Yup.string().min(8, "Password Length Should be at least 8 characters").required('Password is required')
      });

      const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
      });

      const uploadUser = async (formData:UserData) => {
        setLoading(true)
        try{
        const registerResult = await registerNewParent(formData);
        if(registerResult.error){
          setError(registerResult.message)
          setLoading(false)
        }
        else{
          const sendEmail = await sendValidationEmailToParent(formData.email, registerResult.identifier as string, registerResult.name as string)
          if(sendEmail?.sucesss){
            setError("")
            setBackdrop(true)
            setLoading(false)
          }
          else{
            setError("Failed to Add Parent")
          }
        }
        } catch(e){
          console.log(e)
          setLoading(false)
          setError('Failed to Add Parent')
        }
        
           
      }
  return (
    <div className="flex items-center justify-between px-10 h-screen">
        <div className="text-2xl text-center w-1/2">
            Are you a parent or a guardian looking for a seamless school admison process, look no further <strong>Scholary</strong> is here to help register here to experience efficient addmisons
        </div>
    <form onSubmit={handleSubmit(uploadUser)} className={!backdrop ? "w-2/5 pe-2" : "hidden"}>
    <div className="join join-vertical max-w-xl w-full ">
    {error && <div role="alert" className="alert alert-error max-w-xl">
  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span> {error} </span>
</div>}
   <div className="flex justify between">
   <label className='form-control max-w-xl my-4 join-item'>
           <p className="my-2"> First Name</p>
        <input type="text" placeholder="Type here" className="input input-bordered  "  {...register("firstName")}/>
       <p className="text-error text-sm"> {errors.firstName?.message} </p>
        </label>
        <label className='form-control max-w-xl my-4 join-item'>
           <p className="my-2"> Last Name</p>
        <input type="text" placeholder="Type here" className="input input-bordered  "  {...register("lastName")}/>
       <p className="text-error text-sm"> {errors.firstName?.message} </p>
        </label>
   </div>
        <label className='form-control max-w-xl my-4 join-item'>
           <p className="my-2"> Email Address</p>
        <input type="text" placeholder="Type here" className="input input-bordered w-full "  {...register("email")}/>
       <p className="text-error text-sm"> {errors.email?.message} </p>
        </label>
        <label className='form-control max-w-xl my-4 join-item'>
           <p className="my-2"> Phone Number</p>
        <input type="text" placeholder="Type here" className="input input-bordered w-full "  {...register("phoneNumber")}/>
       <p className="text-error text-sm"> {errors.phoneNumber?.message} </p>
        </label>

        <label className='form-control max-w-xl my-4 join-item'>
           <p className="my-2"> Password</p>
        <input type="password" placeholder="Type here" className="input input-bordered w-full "  {...register("password")}/>
       <p className="text-error text-sm"> {errors.password?.message} </p>
        </label>
        

      <button className="btn btn-success my-5" disabled={loading} type="submit" > {!loading? "Add User Details" : "Loading...."} </button>
        
    </div>
    <div className="flex mb-4">
        <p>Already have an account? <Link href={`/login`} className="hover:text-underline">Login</Link> </p>
         
    </div>
    </form>
    
    <div className={ `text-center text-lg flex items-center justify-center transition-width duration-1000  bg-base-100 -z-50 opacity-80  ${backdrop ? 'w-2/4' : 'w-0 text-transparent'}`} >We have sent a verification message to the email provided, <br/> click on the link to access your account</div>
    
    </div>
  )
}