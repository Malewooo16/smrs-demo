import Image from 'next/image';
import React from 'react';
import { getAdmissionById } from '@/actions/admissions/getAdmissions';
import { getSchoolByIdForAdmission } from '@/actions/schools/findSchools';
import ValidateAdmissionData from '@/app/main-components/AdmissionData';
import BeemPay from '@/app/main-components/BeemPay';

interface Admission {
    id: string;
    firstName: string;
    lastName: string;
    homeAddress: string;
    dob: Date;
    imgUrl: string | null;
    // Define other properties if needed
}

interface Error {
    success: boolean;
    message: string;
}

export default async function ValidateAdmission({searchParams}:{searchParams:{addyId:string, escuela:string}}){
    try{
        const admissionData = await getAdmissionById(searchParams.addyId, searchParams.escuela);
        const school = await getSchoolByIdForAdmission(searchParams.escuela);
        console.log(admissionData)
        if(admissionData && school !== null){
            
            return (
                <div className='flex flex-wrap h-full px-2 justify-between'>
                    <ValidateAdmissionData admission={admissionData} school={school} />
                    <BeemPay />
                </div>
            )
        }

        return (<div>Failed To Fetch Data</div>)
    }
    catch(error){
        return (<div>Error When Fetching Data</div>)
    }
}