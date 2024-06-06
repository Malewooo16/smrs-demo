import { getAdmissionById, getSpecifcAdmissionById } from "@/actions/admissions/getAdmissions";
import { getClasses } from "@/actions/schools/getClassesData";
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
  
  let schoolInfo = null;
  let classes = null;

  if (session?.user.teacher) {
    schoolInfo = await schoolInfoFromTeacherId(parseInt(session.user.teacher));
  }

  // Handle the case where schoolInfo is not available
  if (!schoolInfo) {
    return <div>Error: Unable to retrieve school information.</div>;
  }

  const admissionData = await getSpecifcAdmissionById(params.admissionId, schoolInfo.id);
  const admissionStats = admissionData as AdmissionData;
  console.log(admissionData)

  if (schoolInfo && admissionStats) {
    classes = await getClasses(schoolInfo.id, parseInt(admissionStats.selectedClass));
  }

  const admissionInfo = {
    parentEmail: admissionStats.admission.Parent.email,
    studentName: `${admissionStats.admission.firstName} ${admissionStats.admission.lastName}`,
    schoolName: schoolInfo?.name,
    schoolId: schoolInfo?.id,
    classId: parseInt(admissionStats.selectedClass),
  };

  return (
    <div className="rounded-lg shadow-md p-6 mb-4 w-[54rem]">
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
        <div>
          <h3 className="text-lg font-semibold">Documents</h3>
          <Link
            href={admissionStats.admission.objects.birthCert}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-blue-500 hover:underline">Link to Birth Certificate</p>
          </Link>
          <Link
            href={admissionStats.admission.objects.transcripts}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-blue-500 hover:underline">Link to Transcripts</p>
          </Link>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Admission Status</h3>
          <p>Admission Status: {admissionStats.status}</p>
          <p>Selected Class: {classes?.name}</p>
        </div>
      </div>
      {admissionStats.status === "Approved" ? null : (
        <UpdateAdmissionStatus admissionId={params.admissionId} admissionInfo={admissionInfo} />
      )}
    </div>
  );
}
