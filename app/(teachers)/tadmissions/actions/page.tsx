import { getAdmissionsForSchool } from '@/actions/admissions/getAdmissions';
import { schoolInfoFromTeacherId } from '@/actions/schools/getSchoolInfo';
import { ApprovedAdmissions } from '@/app/main-components/AdmissionInfoAndActions';
import { authOptions } from '@/utilities/authOptions';
import { getServerSession } from 'next-auth';
import React from 'react'

export default async function page({searchParams}:{searchParams:any}) {
    const {action} = searchParams
    const session = await getServerSession(authOptions);
  let admissions;
  let schoolInfo
  if(session?.user.teacher){
    schoolInfo = await schoolInfoFromTeacherId(parseInt(session.user.teacher))
    admissions = await getAdmissionsForSchool(schoolInfo?.id);
  }
    //console.log(searchParams)
 if(action === "SendJoining"){
  return(
    <div>
      <h1 className='text-xl my-4'>Send Joining Instructions</h1>
     <h1>A Joining Instruction Document Will be Sent to the Parents of the following Students</h1>
     <label>
      <p>Choose Document</p>
     <input type="file" className="file-input file-input-bordered w-full max-w-lg" />
     </label>
      <ApprovedAdmissions admissionData={admissions} />
    </div>
  )
 }
}
