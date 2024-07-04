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
import { useRouter } from "next/navigation";
import ParentInfo from "@/app/main-components/ParentInfo";

export default function AdmissionMain({admissions}:{admissions:any}) {
    const searchParams = useSearchParams();
    const escuela = searchParams.get("escuela") as string;
    const [newAdmission, setnewAdmission] = useState(false)
    const [step, setStep] = useState(1);
    const [modal, setModal] = useState(false);
    const router = useRouter()
    const setNextStep = () =>{
        setStep((prev)=>prev+1)
    }

    const setPrevStep = () =>{
        if(step>1){
            setStep((prev) => prev-1)
        }
    }
  const handleNewAdmissions = ()=>{
    setModal(false)
    setnewAdmission(true)
  }
  const closeModal = ()=>{
    setModal(false);
    router.back()
    
  }
    useEffect(() => {
        if(admissions.length > 0) {
            setModal(true);
        }
    }, [admissions]);

    return (
        <div>
            {admissions.length > 0 && (
                <FileUploadModal isOpen={modal} onClose={closeModal} header="Saved Admissions">
                    <div className="flex justify-center w-full"> <button className="btn btn-success my-4" onClick={handleNewAdmissions}> Add a New Admission</button> </div>
                    <p className="text-lg mb-4">You can use your previously saved admissions</p>
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
            {admissions.length === 0 || newAdmission ? (
                <div>
                    
                    {step === 1 && <AdmissionForm setNextStep={setNextStep} />}
                    {step === 2 && <UserPicUpload setNextStep={setNextStep} />}
                    {step === 3 && <ObjectsUplaod setNextStep={setNextStep} />}
                    {step === 4 && <ParentInfo setNextStep={setNextStep} />}
                    {step === 5 && <SuccessItem />}
                </div>
            ) : null}
        </div>
    );
}
