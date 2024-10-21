"use client";


import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { addParentInfo } from "@/actions/admissions/createAdmission";
import admissionStore from "@/store/admissionState";
import { useSearchParams, useRouter } from "next/navigation";



export default function ParentInfo(props:{setNextStep:()=>void}) {
    const searchParams = useSearchParams()
    const escuela = searchParams.get("escuela");
    const router = useRouter()

    const [loading, setLoading] = useState(false);
    const validationSchema = Yup.object().shape({
        fatherName: Yup.string().required("Title is required"),
        fatherContact: Yup.string().required("Title is required"),
        fatherEmail: Yup.string().required("Title is required"),
        fatherOccupation: Yup.string().required("Title is required"),
        motherName: Yup.string().required("Title is required"),
        motherContact: Yup.string().required("Title is required"),
        motherEmail: Yup.string().required("Title is required"),
        motherOccupation: Yup.string().required("Title is required"),
        
      });
    
      const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(validationSchema),
      });

    const updateParentInfo = (async(formData:any)=>{
        const admissionId = admissionStore.getState().admissionId

       try {
         const response = await addParentInfo(formData, admissionId);
        if (!response.success) {
            toast.error(response.message)
        } else {
            toast.success(response.message)
            router.push(`/padmissions/validateAdmission?escuela=${escuela}&addyId=${admissionId}`) 
        }
       } catch (error) {
          toast.error("Something Unexpeted Occured")
       }
    })
  return (
    <div>
    <form onSubmit={handleSubmit(updateParentInfo)}>
    <div className="join join-vertical flex max-w-xl">
    <h1 className="text-xl">Parent Information</h1>
    <label className='form-control max-w-xl my-4 join-item'>
           <p className="my-2"> Fathers&apos;s Name</p>
        <input type="text" placeholder="Type here" className="input input-bordered w-full "  {...register("fatherName")}/>
       <p className="text-error text-sm"> {errors.fatherName?.message} </p>
        </label>
        <label className='form-control max-w-xl my-4 join-item'>
           <p className="my-2"> Fathers&apos;s Phone Number</p>
        <input type="text" placeholder="Type here" className="input input-bordered w-full "  {...register("fatherContact")}/>
       <p className="text-error text-sm"> {errors.fatherContact?.message} </p>
        </label>
        <label className='form-control max-w-xl my-4 join-item'>
           <p className="my-2"> Fathers&apos;s Email Address</p>
        <input type="text" placeholder="Type here" className="input input-bordered w-full "  {...register("fatherEmail")}/>
       <p className="text-error text-sm"> {errors.fatherEmail?.message} </p>
        </label>
        <label className='form-control max-w-xl my-4 join-item'>
           <p className="my-2"> Fathers&apos;s Occupation</p>
        <input type="text" placeholder="Type here" className="input input-bordered w-full "  {...register("fatherOccupation")}/>
       <p className="text-error text-sm"> {errors.fatherOccupation?.message} </p>
        </label>

        <label className='form-control max-w-xl my-4 join-item'>
           <p className="my-2"> Mother&apos;s Name</p>
        <input type="text" placeholder="Type here" className="input input-bordered w-full "  {...register("motherName")}/>
       <p className="text-error text-sm"> {errors.motherName?.message} </p>
        </label>
        <label className='form-control max-w-xl my-4 join-item'>
           <p className="my-2"> Mother&apos;s Phone Number</p>
        <input type="text" placeholder="Type here" className="input input-bordered w-full "  {...register("motherContact")}/>
       <p className="text-error text-sm"> {errors.motherContact?.message} </p>
        </label>
        <label className='form-control max-w-xl my-4 join-item'>
           <p className="my-2"> Mother&apos;s Email Address</p>
        <input type="text" placeholder="Type here" className="input input-bordered w-full "  {...register("motherEmail")}/>
       <p className="text-error text-sm"> {errors.motherEmail?.message} </p>
        </label>
        <label className='form-control max-w-xl my-4 join-item'>
           <p className="my-2"> Mother&apos;s Occupation</p>
        <input type="text" placeholder="Type here" className="input input-bordered w-full "  {...register("motherOccupation")}/>
       <p className="text-error text-sm"> {errors.motherOccupation?.message} </p>
        </label>
        
      <button className="btn btn-success my-10" disabled={loading} type="submit"> Add User Details </button>
        
    </div>
    </form>
  
         
    </div>
  )
}
