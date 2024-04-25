"use client"

import SearchInput from "@/app/main-components/SearchInput"
import { AdmissionData } from "@/utilities/admissionTypes"
import { useState } from "react"



export default function ClientWrapperTAdmissions({admissions}:{admissions:any}) {
    const [search, setsearch] = useState('')
    const searchHandler:React.ChangeEventHandler<HTMLInputElement> = (e) =>{
        setsearch(e.target.value)
    }
    const validatedAdmissions = admissions as AdmissionData[]
  return (
    <div>
        <div className="my-4"> <SearchInput searchHandler={searchHandler} /> </div>
        <div className="flex flex-col">
      
      {validatedAdmissions.map((a)=>(
          <div key={a.id} className="border rounded-lg p-4"> 
          <p>Name:{a.admission.firstName} {a.admission.lastName}</p>
          <p>Date of Birth:{a.admission.dob.toLocaleDateString()} </p>
          <p>Address: {a.admission.homeAddress} </p>
      </div>

      ))}
 
</div>
    </div>
  )
}
