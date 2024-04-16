
import getActiveAdmissions from '@/actions/schools/findActiveAdmissions'
import AdmissionWraper from './AdmissionWraper'
import { ISchoolAdmission } from '@/utilities/admissionTypes'
import { getAllAdmissionsForParent } from '@/actions/admissions/getAdmissions';

export default  async function Admissions() {
  const activeAdmissions = await getActiveAdmissions();
  const validatedAdmissions = await getAllAdmissionsForParent()
  
  
  return (
    <div>
      <h1 className="text-xl text-center">Admissions</h1>
      <AdmissionWraper admissions={activeAdmissions} headers='admissions' />
      <div>
          <h2>Admissions Connected to Schools</h2>
          <ul className='w-96'>
            {validatedAdmissions.map((a:any) => (
             <div className='border-2 my-4 p-2 rounded' key={a.id}>
               <li >
                <p>First Name: {a.firstName}</p>
                <p>Last Name: {a.lastName}</p>
                {/* Add more details as needed */}
                {a.schools.map((s:any)=>(
                  <li key={s.id}> {s.name} </li>
                ))}
              </li>
             </div>
            ))}
          </ul>
        </div>
    </div>
  )
}
