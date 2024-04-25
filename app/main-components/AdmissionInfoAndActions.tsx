import { ISchoolAdmission } from "@/utilities/admissionTypes"


export function AdmissionInfo ({schoolData}:{schoolData:any}){
   const school = schoolData as ISchoolAdmission
    return(
        <div className=" rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-semibold mb-2">{school.name}</h2>
        <p className="text-gray-600 mb-2">{school.address}</p>
        <p className="text-gray-600 mb-2">Email: {school.emailAddress}</p>
        <p className="text-gray-600 mb-2">
          Admission Status: {school.admissionStatus ? 'Active' : 'Not Active'}
        </p>
        <p className="text-gray-600 mb-2">
          Admission Dates: {new Date(school.admissionDates.from).toLocaleDateString()} - {new Date(school.admissionDates.to).toLocaleDateString()}
        </p>
      </div>
    )

}