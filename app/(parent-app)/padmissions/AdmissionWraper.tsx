"use client"
import FileUploadModal from '@/app/main-components/FileUploadModal'
import SearchInput from '@/app/main-components/SearchInput';
import { ISchoolAdmission } from '@/utilities/admissionTypes';
import Link from 'next/link';
import React, { useState } from 'react'

export default function AdmissionWraper({admissions, headers}:{admissions:any; headers:string}) {
   
    const [modal, setmodal] = useState(false);
  return (
    <div>
      <button className='btn btn-success' onClick={()=> setmodal(true)}>Find Admiting Schools</button>
      <FileUploadModal isOpen={modal} onClose={()=> setmodal(false)} header='Active Schools'>
        <SearchInput />
      <ul className="grid grid-rows-1 gap-2 mt-4">
  {admissions.map((a: ISchoolAdmission) => (
    <Link href={{
      pathname:'/padmissions/newAdmission',
      query:{
        escuela:a.id
      }

    }} key = {a.id}>
      <li key={a.id} className="border rounded-lg p-4 shadow-md">
      <div className="flex flex-col h-full">
        <h1 className="text-lg font-semibold mb-2">{a.name}</h1>
        <p className="text-sm mb-2">{a.address}</p>
        <p className="text-sm">
          <span>From: {new Date(a.admissionDates.from).toUTCString().slice(0, -13)}</span>
          <span className="ml-2">To: {new Date(a.admissionDates.to).toUTCString().slice(0, -13)}</span>
        </p>
      </div>
    </li>
    </Link>
  ))}
</ul>

      </FileUploadModal>
    </div>
  )
}
