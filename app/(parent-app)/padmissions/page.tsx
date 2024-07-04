
import getActiveAdmissions from '@/actions/schools/findActiveAdmissions'
import AdmissionWraper from './AdmissionWraper'
import { ISchoolAdmission } from '@/utilities/admissionTypes'
import { getAllAdmissionsForParent } from '@/actions/admissions/getAdmissions';

import Link from 'next/link';
import  getStatusColor  from '@/utilities/statusColors';
import calculateAge from '@/utilities/ageCalculator';
import AgeComponent from '@/app/main-components/AgeCalculator';

export default  async function Admissions() {
  const activeAdmissions = await getActiveAdmissions();
  const validatedAdmissions = await getAllAdmissionsForParent<any>();
  
 
  const getStatusColor = (status:string) => {
    switch (status) {
      case 'Pending':
        return 'text-orange-500';
      case 'Rejected':
        return 'text-red-500';
      case 'Accepted':
        return 'text-teal-500';
      default:
        return '';
    }
  };

  

  
  return (
    <div className="container mx-auto">
  <h1 className="text-4xl text-center font-bold mb-4">Admissions</h1>
  <div className='flex justify-center'>
    <Link href={`/padmissions/activeSchools`}> <button className='btn btn-success mb-4 '> Find Active schools </button> </Link> 
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {validatedAdmissions.length>0 ? validatedAdmissions.map((a:any) => (
      <div key={a.id} className="rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-2">{a.firstName} {a.lastName}</h2>
        <p className="text-gray-600 mb-4">{new Date(a.dob).toLocaleDateString()}</p>
        <p className='flex text-grey-500 font-semibold'> Age: <AgeComponent dob={a.dob} /> </p>
        <h3 className="text-lg font-semibold underline">Schools</h3>
        <ul>
          {a.AdmissionStats.map((s:any) => (
            <li key={s.id} className="mb-2">
              <p className="font-semibold">{s.school.name}</p>
              <p>Status: 
                <span className= {`${getStatusColor(s.status)}`} >
                  {s.status}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    )) : null}
  </div>
</div>

  )
}
