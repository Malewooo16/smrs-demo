"use client"

import { AdmissionData, ISchoolAdmission } from "@/utilities/admissionTypes"
import { FormEvent, useEffect, useState } from "react"
import SearchInput from "./SearchInput"
import Link from "next/link"
import { updateAdmissionStatusString } from "@/actions/admissions/validateAdmission"
import { usePathname, useRouter } from "next/navigation"
import { sendSuccessAdmissionToParent } from "@/actions/parents/sendValidationEmailToParent"


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
export function ApprovedAdmissions({admissionData}:{admissionData:any}){
  const pathname = usePathname()
  const admissions = admissionData as AdmissionData[]
  const [search, setSearch] = useState(" ")
  const searchHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value)
}
  return(
    <div>
      <div className="my-4"> <SearchInput searchHandler={searchHandler}/> </div>
      <p className="text-lg font-semibold">Approved Admissions</p>
      {pathname !== '/tadmissions/actions' ? <div>
        <h2 className="text-md mb-2">The admissions Below await the following actions</h2>
        <div className="flex w-[30rem] justify-between">
         <Link href={{
          pathname:`/tadmissions/actions`,
          query:{action:"SendJoining"}
         }}>
           <button className="btn btn-warning "> Sending Joining  <br/> Instructions </button>
         </Link>
          <button className="btn btn-warning">Connection to Classes</button>
        </div>
      </div> : null}
      <ul className="my-4">
        {admissions.filter((a)=>{
          return a.status === "Approved"
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
export function UpdateAdmissionStatus ({admissionId, admissionInfo}:{admissionId:string, admissionInfo:any}){
  const {parentEmail, studentName, schoolName} = admissionInfo
  const router = useRouter();
  const [showForm, setshowForm] = useState(false);
  const [loading, setloading] = useState(false)
  const [selected, setSelected] = useState(" ");
  const [validationErr, setValidationErr] = useState("")
  useEffect(()=>{
     if(selected === "Approved" || selected==="Rejected"){
      setValidationErr("")
     }
  }, [selected])
  const updateAdmissionStatus : React.FormEventHandler<HTMLFormElement> = async(e)=>{

     e.preventDefault();
    setloading(true)
     if(selected !=="Approved" && selected !=="Rejected"){
      setValidationErr("Valid Status Required");
     }
     
     try{
      const updateStatus = await updateAdmissionStatusString(admissionId, selected);
      if(updateStatus.success === false){
        alert("Error Occured")
        setloading(false)
      }
      else{
        //TODO Please Add toasts
       
        const emailResult = await sendSuccessAdmissionToParent(parentEmail, studentName, schoolName);
        if(emailResult.success===true){
          router.push(`/tadmissions`)
        }
        else{
          alert("Error Ocured")
          setloading(false)
        }

        
      }
     }
     catch{
      setloading(false)
      alert("Error Occured")
     }
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
<button className="btn btn-success mx-4" disabled={loading} type="submit"> Update </button>
<div> <p className="text-md text-error">{validationErr}</p> </div>
  </form>}
</div>

    
  )

}