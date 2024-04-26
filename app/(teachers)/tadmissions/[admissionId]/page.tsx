import { getAdmissionById } from "@/actions/admissions/getAdmissions";
import { UpdateAdmissionStatus } from "@/app/main-components/AdmissionInfoAndActions";
import { IStudentAdmission } from "@/utilities/admissionTypes";
import Image from "next/image";
import Link from "next/link";

export default async function page({
  params,
}: {
  params: { admissionId: string };
}) {
  const admissionData = await getAdmissionById(params.admissionId);
  const admission = admissionData as IStudentAdmission;
  //console.log(admission)
  return (
    <div className=" rounded-lg shadow-md p-6 mb-4">
      <Image
        src={admission.imgUrl as string}
        width={150}
        height={150}
        alt={admission.firstName}
      />
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">
          {admission.firstName} {admission.lastName}
        </h2>
        <span className="text-sm text-gray-500">
          DOB: {new Date(admission.dob).toLocaleDateString()}
        </span>
      </div>
      <p className="text-gray-600 mb-2">
        Home Address: {admission.homeAddress}
      </p>
     <div className="flex justify-between w-[40rem]">
         <div className="grid grid-cols-2 gap-2">
        <div>
          <h3 className="text-lg font-semibold ">Documents</h3>
          <Link
            href={admission.objects.birthCert}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-blue-500 hover:underline">Link to Transcripts</p>
          </Link>
          <Link
            href={admission.objects.transcripts}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-blue-500 hover:underline">Link to Transcripts</p>
          </Link>
        </div>
        
      </div>
    <div>
    <h3 className="text-lg font-semibold mb-2">Admission Status</h3>
        <ul>
          {admission.AdmissionStats.map((stats) => (
            <li key={stats.id}>
              <p>Status: {stats.status}</p>
              <p>Selected Class: {stats.selectedClass}</p>
            </li>
          ))}
        </ul>
    </div>
   
     </div>
    <UpdateAdmissionStatus admissionId={params.admissionId} />
    </div>
  );
}
