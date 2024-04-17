
import getActiveAdmissions from '@/actions/schools/findActiveAdmissions'
import AdmissionWraper from './AdmissionWraper'
import { ISchoolAdmission } from '@/utilities/admissionTypes'
import { getAllAdmissionsForParent } from '@/actions/admissions/getAdmissions';

export default  async function Admissions() {
  const activeAdmissions = await getActiveAdmissions();
  const validatedAdmissions = await getAllAdmissionsForParent();
 console.log(validatedAdmissions[0])
  
  
  return (
    <div>
      <h1 className="text-xl text-center">Admissions</h1>
      <AdmissionWraper admissions={activeAdmissions} headers='admissions' />
      {validatedAdmissions.map((a:any)=>(
  <div key={a.id} className="my-8 border border-gray-300 rounded p-4 w-96">
    <h2 className="text-xl font-bold mb-2">{a.firstName} {a.lastName}</h2>
    <p className="text-gray-600 mb-2">{a.dob.toLocaleDateString()}</p>
    <h3 className="text-lg font-semibold mb-2">Schools</h3>
    <ul>
      {a.AdmissionStats.map((s:any)=>(
        <li key={s.id} className="mb-2">
          <p className="font-semibold">{s.school.name}</p>
          <p>Status: {s.status}</p>
        </li>
      ))}
    </ul>
  </div>
))}

    </div>
  )
}
