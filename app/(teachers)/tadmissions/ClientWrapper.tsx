"use client"
import { AdmissionInfo, ApprovedAdmissions } from "@/app/main-components/AdmissionInfoAndActions";
import { EditAdmissionInfo } from "@/app/main-components/EditAdmissionInfo";
import SearchInput from "@/app/main-components/SearchInput"
import { AdmissionData } from "@/utilities/admissionTypes"
import { useEffect, useState } from "react"
import { PendingAdmissions } from "../../main-components/AdmissionInfoAndActions";
import { useSearchParams } from "next/navigation";

export default function ClientWrapperTAdmissions({admissions, school}:{admissions:any, school:any}) {
    const searchParams = useSearchParams()
    const T = searchParams.get("T") as string;
    const step = parseInt(T)
    const [component, setComponent] = useState(1)
    //console.log(school)
    useEffect(()=>{
        setComponent(step);
    }, [step])
   

    const renderHandler = (num: number) => {
        setComponent(num);
    }

    return (
        <div>
            <div className="my-4">
                <div className="flex justify-between w-[22rem] bg-base-200 p-2 rounded-xl">
                    <div className={`rounded-lg px-4 py-1 cursor-pointer  hover:bg-base-300  ${component===1 ? 'bg-base-300':' '}` }  onClick={() => renderHandler(1)}>General</div>
                    <div className={`rounded-lg px-4 py-1 cursor-pointer hover:bg-base-300 ${component===2 ? 'bg-base-300':''}` } onClick={() => renderHandler(2)}>Pending</div>
                    <div className={`rounded-lg  px-4 py-1 cursor-pointer hover:bg-base-300 ${component===3 ? 'bg-base-300':''}` } onClick={() => renderHandler(3)}>Approved</div>
                </div>
            </div>

            {component === 1 ? <AdmissionInfo schoolData={school} renderHandler={renderHandler} /> : null}
            {component === 2  ? <PendingAdmissions admissionData={admissions} /> : null}
            {component === 3 ? <ApprovedAdmissions admissionData={admissions} /> : null}
            {component === 4 ? <EditAdmissionInfo schoolData={school} renderHandler={renderHandler}/> : null}
        </div>
    )
}
