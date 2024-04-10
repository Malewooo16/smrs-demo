"use client"

import { useState } from "react";
import AdmissionForm from "../main-components/AdmissionForm";
import UserPicUpload from "../main-components/UserPicUpload";
import ObjectsUplaod from "../main-components/ObjectsUplaod";
import SuccessItem from "./SuccessItem";

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
