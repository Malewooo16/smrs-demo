"use client"

import { useState } from "react";

import SuccessItem from "./SuccessItem";
import AdmissionForm from "@/app/main-components/AdmissionForm";
import ObjectsUplaod from "@/app/main-components/ObjectsUplaod";
import UserPicUpload from "@/app/main-components/UserPicUpload";

export default function AdmissionMain() {
    const [step, setStep] = useState(1);

    const setNextStep = () =>{
        setStep((prev)=>prev+1)
    }

    const setPrevStep = () =>{
        if(step>1){
            setStep((prev) => prev-1)
        }
    }
    return (
    <div>
        <h1 className="text-lg">Student Admission</h1>
        {step === 1 && <AdmissionForm setNextStep={setNextStep} />}
        {step === 2 && <UserPicUpload setNextStep={setNextStep} />}
        {step === 3 && <ObjectsUplaod setNextStep={setNextStep}/>}
        {step === 4 && <SuccessItem />}
    </div>
  )
}
