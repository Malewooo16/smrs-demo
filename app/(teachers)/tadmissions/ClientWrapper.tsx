"use client"
import { AdmissionInfo } from "@/app/main-components/AdmissionInfoAndActions";
import SearchInput from "@/app/main-components/SearchInput"
import { AdmissionData } from "@/utilities/admissionTypes"
import { useState } from "react"
import { PendingAdmissions } from "../../main-components/AdmissionInfoAndActions";

export default function ClientWrapperTAdmissions({admissions, school}:{admissions:any, school:any}) {
    const [search, setSearch] = useState('');
    const [component, setComponent] = useState(1)

    const searchHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearch(e.target.value)
    }

    const renderHandler = (num: number) => {
        setComponent(num);
    }

    return (
        <div>
            <div className="my-4">
                <div className="flex justify-between w-[22rem] bg-base-200 p-2 rounded-md">
                    <button className={`btn btn-ghost rounded-xl  hover:bg-base-300  ${component===1 ? 'bg-base-300':' '}` }  onClick={() => renderHandler(1)}>General</button>
                    <button className={`btn btn-ghost rounded-xl hover:bg-base-300 ${component===2 ? 'bg-base-300':''}` } onClick={() => renderHandler(2)}>Pending</button>
                    <button className={`btn btn-ghost rounded-xl hover:bg-base-300 ${component===3 ? 'bg-base-300':''}` } onClick={() => renderHandler(3)}>Approved</button>
                </div>
            </div>

            {component === 1 && <AdmissionInfo schoolData={school} />}
            {component === 2 && <PendingAdmissions admissionData={admissions} />}
            {component === 3 && <div> Approved </div>}
        </div>
    )
}
