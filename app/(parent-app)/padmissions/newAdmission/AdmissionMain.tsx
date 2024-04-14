"use client"
import { useEffect, useState } from "react";

import SuccessItem from "./SuccessItem";
import AdmissionForm from "@/app/main-components/AdmissionForm";
import ObjectsUplaod from "@/app/main-components/ObjectsUplaod";
import UserPicUpload from "@/app/main-components/UserPicUpload";
import FileUploadModal from "@/app/main-components/FileUploadModal";
import { IStudentAdmission } from "@/utilities/admissionTypes";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function AdmissionMain({admissions}:{admissions:any}) {
    const searchParams = useSearchParams();
    const escuela = searchParams.get("escuela") as string;
    
    const [step, setStep] = useState(1);
    const [modal, setModal] = useState(false);

    const setNextStep = () =>{
        setStep((prev)=>prev+1)
    }

    const setPrevStep = () =>{
        if(step>1){
            setStep((prev) => prev-1)
        }
    }

    useEffect(() => {
        if(admissions.length > 0) {
            setModal(true);
        }
    }, [admissions]);

    return (
        <div>
            {admissions.length > 0 && (
                <FileUploadModal isOpen={modal} onClose={() => setModal(false)} header="Saved Admissions">
                    <div className="flex justify-center w-full"> <button className="btn btn-success my-4"> Add a New Admission</button> </div>
                    <ul className="grid grid-rows-1 gap-4 ">
                        {admissions.map((e:IStudentAdmission) => (
                            <li key={e.id} className="border rounded-lg p-4 shadow-md">
                                <Link href={{
                                    pathname:'/padmissions/validateAdmission',
                                    query:{
                                        escuela,
                                        addyId:e.id
                                    }
                                }} > <div className="flex flex-col h-full">
                                <h2 className="text-lg">{e.firstName} {e.lastName}</h2>
                                <p>Address: {e.homeAddress} </p>
                            </div> </Link>
                            </li>
                        ))}
                    </ul>
                </FileUploadModal>
            )}
            {admissions.length === 0 && (
                <div>
                    <h1 className="text-lg">Student Admission</h1>
                    {step === 1 && <AdmissionForm setNextStep={setNextStep} />}
                    {step === 2 && <UserPicUpload setNextStep={setNextStep} />}
                    {step === 3 && <ObjectsUplaod setNextStep={setNextStep} />}
                    {step === 4 && <SuccessItem />}
                </div>
            )}
        </div>
    );
}
