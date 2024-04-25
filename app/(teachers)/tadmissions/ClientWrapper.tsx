"use client"
import { AdmissionInfo } from "@/app/main-components/AdmissionInfoAndActions";
import SearchInput from "@/app/main-components/SearchInput"
import { AdmissionData } from "@/utilities/admissionTypes"
import { useState } from "react"

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
                <div className="flex justify-between w-[20rem]">
                    <button className={`btn btn-ghost rounded-2xl  ${component===1 ? 'outline':''}` }  onClick={() => renderHandler(1)}>General</button>
                    <button className={`btn btn-ghost rounded-2xl ${component===2 ? 'outline':''}` } onClick={() => renderHandler(2)}>Pending</button>
                    <button className={`btn btn-ghost rounded-2xl ${component===3 ? 'outline':''}` } onClick={() => renderHandler(3)}>Approved</button>
                </div>
            </div>

            {component === 1 && <AdmissionInfo schoolData={school} />}
            {component === 2 && <div> Pending </div>}
            {component === 3 && <div> Approved </div>}
        </div>
    )
}
