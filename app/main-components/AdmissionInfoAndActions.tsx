"use client"

import { AdmissionData, ISchoolAdmission } from "@/utilities/admissionTypes"
import { FormEvent, useEffect, useState } from "react"
import SearchInput from "./SearchInput"
import Link from "next/link"


export function AdmissionInfo ({schoolData}:{schoolData:any}){
   const school = schoolData as ISchoolAdmission
    return(
        <div className=" rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-semibold mb-2">{school.name}</h2>
        <p className="text-gray-600 mb-2">{school.address}</p>
        <p className="text-gray-600 mb-2">Email: {school.emailAddress}</p>
        <p className="text-gray-600 mb-2">
          Admission Status: {school.admissionStatus ? 'Active' : 'Not Active'}
        </p>
        <p className="text-gray-600 mb-2">
          Admission Dates: {new Date(school.admissionDates.from).toLocaleDateString()} - {new Date(school.admissionDates.to).toLocaleDateString()}
        </p>
      </div>
    )

}

export function PendingAdmissions({admissionData}:{admissionData:any}){
  const admissions = admissionData as AdmissionData[]
  const [search, setSearch] = useState(" ")
  const searchHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value)
}
  return(
    <div>
      <div className="my-4"> <SearchInput searchHandler={searchHandler}/> </div>
      <p className="text-lg font-semibold">Pending Admissions</p>
      <ul className="my-4">
        {admissions.filter((a)=>{
          return a.status === "Pending"
        }).filter((item)=>{
          return search.toLowerCase() === " " ? item : item.admission.firstName.toLowerCase().includes(search);
        }).map((a)=>(
          <li key={a.admissionId}>
            <Link href={`/tadmissions/${a.admissionId}`}>
            <div className="rounded-lg shadow-md p-6 mb-4">
              <h1 className="text-xl"> {a.admission.firstName} {a.admission.lastName} </h1>
              <p> {a.admission.homeAddress} </p>
              <p> {a.admission.dob.toLocaleDateString()} </p>
            </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )

}

export function UpdateAdmissionStatus ({admissionId}:{admissionId:string}){
  const [showForm, setshowForm] = useState(false);
  const [selected, setSelected] = useState(" ");
  const [validationErr, setValidationErr] = useState("")
  useEffect(()=>{
     if(selected === "Approved" || selected==="Rejected"){
      setValidationErr("")
     }
  }, [selected])
  const updateAdmissionStatus : React.FormEventHandler<HTMLFormElement> = (e)=>{
     e.preventDefault()
     if(selected !=="Approved" && selected !=="Rejected"){
      setValidationErr("Valid Status Required");
     }
     console.log(selected)

  }

  return(
<div>
<div className="flex  mt-4"> <button className={`btn btn-info ${showForm ? "hidden" : " "}`} onClick={()=>setshowForm(true)}>Update Admission Status</button> </div>
{showForm && <form onSubmit={updateAdmissionStatus}>
  <select className="select select-bordered w-full max-w-xl" required onChange={(e)=>setSelected(e.target.value)}>
  <option disabled selected>Select admission Status</option>
  <option className="text-success text-lg">Approved</option>
  <option className="text-error text-lg"> Rejected</option>
</select>
<button className="btn btn-success mx-4" type="submit"> Update </button>
<div> <p className="text-md text-error">{validationErr}</p> </div>
  </form>}
</div>

    
  )

}