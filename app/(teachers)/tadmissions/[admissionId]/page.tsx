import { getAdmissionById, getSpecifcAdmissionById } from "@/actions/admissions/getAdmissions";
import { schoolInfoFromTeacherId } from "@/actions/schools/getSchoolInfo";
import { UpdateAdmissionStatus } from "@/app/main-components/AdmissionInfoAndActions";
import { AdmissionData, IStudentAdmission } from "@/utilities/admissionTypes";
import { authOptions } from "@/utilities/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default async function page({
  params,
}: {
  params: { admissionId: string };
}) {
  const session = await getServerSession(authOptions);
  const admissionData = await getSpecifcAdmissionById(params.admissionId);
  const admissionStats = admissionData as AdmissionData;
  let schoolInfo
  if(session?.user.teacher){
    schoolInfo = await schoolInfoFromTeacherId(parseInt(session.user.teacher))
    
  }
  const admissionInfo = {
      parentEmail:admissionStats.admission.Parent.email,
      studentName:`${admissionStats.admission.firstName} ${admissionStats.admission.lastName}`,
      schoolName:schoolInfo?.school?.name
  }
 // console.log(admissionStats)
  return (
    <div className=" rounded-lg shadow-md p-6 mb-4 w-[54rem]">
      <Image
        src={admissionStats.admission.imgUrl as string}
        width={150}
        height={150}
        alt={admissionStats.admission.firstName}
      />
      <div className="flex items-center justify-between my-2">
      <h2 className="text-lg font-bold">
          {admissionStats.admission.firstName} {admissionStats.admission.lastName}
        </h2>
        <span className="text-md text-gray-500">
          DOB: {new Date(admissionStats.admission.dob).toLocaleDateString()}
        </span>
      </div>
      <p className="text-gray-600 mb-2">
        Home Address: {admissionStats.admission.homeAddress}
      </p>
     <div className="flex justify-between">
         <div className="">
        <div>
          <h3 className="text-lg font-semibold ">Documents</h3>
          <Link
            href={admissionStats.admission.objects.birthCert}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-blue-500 hover:underline">Link to Transcripts</p>
          </Link>
          <Link
            href={admissionStats.admission.objects.transcripts}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-blue-500 hover:underline">Link to Transcripts</p>
          </Link>
        </div>
        
      </div>
    <div>
    <h3 className="text-lg font-semibold mb-2">Admission Status</h3>
      <p>Admission Status:{admissionStats.status}</p>
      <p>Selected Class:{admissionStats.selectedClass}</p>
    </div>
   
     </div>
    {admissionStats.status === "Approved" ? null : <UpdateAdmissionStatus admissionId={params.admissionId} admissionInfo={admissionInfo} />}
    </div>
  );
}