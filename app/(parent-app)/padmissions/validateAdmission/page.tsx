import Image from 'next/image';
import React from 'react';
import { getAdmissionById } from '@/actions/admissions/getAdmissions';
import { getSchoolById } from '@/actions/schools/findSchools';
import ValidateAdmissionData from '@/app/main-components/AdmissionData';

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
        const admissionData = await getAdmissionById(searchParams.addyId);
        const school = await getSchoolById(parseInt(searchParams.escuela));

        if(admissionData && school !== null){
            console.log(school);
            console.log(admissionData)
            return (
                <div>
                    <ValidateAdmissionData admission={admissionData} school={school} />
                </div>
            )
        }

        return (<div>Failed To Fetch Data</div>)
    }
    catch(error){
        return (<div>Error When Fetching Data</div>)
    }
}