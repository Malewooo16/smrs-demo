import getActiveAdmissions from "@/actions/schools/findActiveAdmissions";
import AdmissionWraper from "./AdmissionWraper";
import {ISchoolAdmission} from "@/utilities/admissionTypes";
import {getAllAdmissionsForParent} from "@/actions/admissions/getAdmissions";
import moment from "moment";
import Link from "next/link";



export default async function Admissions() {
  const validatedAdmissions = await getAllAdmissionsForParent();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "text-orange-500";
      case "Rejected":
        return "text-red-500";
      case "Accepted":
        return "text-teal-500";
      default:
        return "";
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl text-[#006d77] text-center font-bold my-8">
        Admissions
      </h1>
      <div className="flex justify-center mb-6">
        <Link href={`/padmissions/newAdmission?escuela=54148e9498fb832e1bc0bd3a5deb87362b1fb8322f4a8fe1a72c391c66d12a45`}>
          <button className="bg-[#006d77] hover:bg-[#008c95] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out">
           Apply Now
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {validatedAdmissions.length > 0 ? (
          validatedAdmissions.map((a) => (
            <div
              key={a.id}
              className="rounded-lg shadow-lg bg-white p-6 border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out"
            >
              <h2 className="text-2xl font-bold mb-2 text-[#005f66]">
                {a.firstName} {a.lastName}
              </h2>
              <p className="text-gray-600 mb-4">
                Date of Birth: {moment(a.dob).format("LL")}
              </p>
              <h3 className="text-lg font-semibold text-[#006d77] underline mb-2">
                Schools
              </h3>
              <ul>
                {a.AdmissionStats.map((s: any) => (
                  <li key={s.id} className="mb-2">
                    <p className="font-semibold text-gray-700">{s.school.name}</p>
                    <p>
                      Status:{" "}
                      <span className={`${getStatusColor(s.status)}`}>
                        {s.status}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No admissions found.
          </p>
        )}
      </div>
    </div>
  );
}

