"use client";

import AddNewUser from "@/main-components/AddNewUser";
import UserPicUpload from "@/main-components/UserPicUpload";
import ValidateUser from "@/main-components/ValidateEmail";
import {useState} from "react";

export default function RegisterNewStudent() {
  const [step, setStep] = useState(1);

  const setNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const backToStart = () => {
    setStep((prevStep) => prevStep - 2);
  };

  return (
    <div>
      <h1 className="text-3xl">Upload New User Details</h1>

      {step === 1 && <AddNewUser nextStep={step} setNextStep={setNextStep} />}

      {step === 2 && <UserPicUpload setNextStep={setNextStep} />}

      {step === 3 && (
        <ValidateUser finalStep={step} backToStart={backToStart} />
      )}
    </div>
  );
}
