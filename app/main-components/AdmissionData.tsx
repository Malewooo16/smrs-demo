import { IStudentAdmission } from "@/utilities/admissionTypes";
import Image from "next/image";

export default function ValidateAdmissionData({ school, admission }: { school: any; admission: any }) {
  const validAdmission = admission as IStudentAdmission;

  return (
    <div className="flex flex-col flex-1 mx-2 lg:w-auto justify-center items-start gap-10 ">
      {/* Student Data */}
      <div className="min-w-md w-full p-6 border rounded-lg shadow-md">
        <h1 className="text-xl font-semibold mb-4">Student Data</h1>
        <div className="border-b-2 w-full"></div>
        <div className="flex flex-col items-center">
          <div className="w-36 h-36 relative rounded-full overflow-hidden my-4">
            <Image src={validAdmission.imgUrl as string}  fill alt={validAdmission.id} />
          </div>
          <h2 className="text-lg font-semibold">{validAdmission.firstName} {validAdmission.lastName}</h2>
          <p className="text-sm mb-2">Date of Birth: {new Date(validAdmission.dob).toLocaleDateString()}</p>
          <p className="text-sm mb-2">Address: {validAdmission.homeAddress}</p>
        </div>
      </div>

      {/* School */}
      <div className="min-w-md w-full p-6 border rounded-lg shadow-md">
        <h1 className="text-xl font-semibold ">School</h1>
        <div className="border-b-2 w-full my-4"></div>
        <div>
          <h2 className="text-lg font-semibold">{school.name}</h2>
          <p className="text-sm mb-2">Address: {school.address}</p>
        </div>
      </div>
    </div>
  );
}
