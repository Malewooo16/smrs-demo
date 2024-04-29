import Image from 'next/image';
import React from 'react';
import { getAdmissionById } from '@/actions/admissions/getAdmissions';
import { getSchoolByIdForAdmission } from '@/actions/schools/findSchools';
import ValidateAdmissionData from '@/app/main-components/AdmissionData';
import BeemPay from '@/app/main-components/BeemPay';
import { IStudentAdmission } from '@/utilities/admissionTypes';

interface Error {
    success: boolean;
    message: string;
}

export default async function ValidateAdmission({ searchParams }: { searchParams: { addyId: string, escuela: string } }) {
    try {
        const admissionData = await getAdmissionById<IStudentAdmission | Error>(searchParams.addyId);
        const school = await getSchoolByIdForAdmission(searchParams.escuela);
        console.log(school)

        if ('success' in admissionData) {
            // Handle error case
            return <div>{admissionData.message}</div>;
        }
        
        if (school && admissionData) {
            // Handle success case
            return (
                <div className=' h-full px-2'>
                    <ValidateAdmissionData admission={admissionData} schoolData={school} />
                </div>
            );
        }


        return <div>Failed To Fetch Data</div>;
    } catch (error) {
        return <div>Error When Fetching Data</div>;
    }
}
