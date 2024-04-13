import { IStudentAdmission } from "@/utilities/admissionTypes";
import Image from "next/image";



export default function ValidateAdmissionData({school, admission}:{school:any, admission:any}){
    const validAdmission = admission as IStudentAdmission
    return(
        <div className="">
            <div className="w-96">
                <h1 className="text-2xl">Student Data</h1>
                <div className="border-b-2 w-full"></div> 
                <Image src={validAdmission.imgUrl as string} width={250} height={250} className="w-[200px] h-[200px]" alt={validAdmission.id}/>
                <h2 className="text-xl">{validAdmission.firstName} {validAdmission.lastName} </h2>
                <p>Date of Birth {validAdmission.dob.toUTCString()} </p>
                <p> Address {validAdmission.homeAddress} </p>
            </div>

            <div className="w-96">
                <h1 className="text-2xl">School</h1>
                <div className="border-b-2"></div> 
                <h2 className="text-xl">{school.name}  </h2>
                <p> Address {school.address} </p>
            </div>

        </div>
    )

}