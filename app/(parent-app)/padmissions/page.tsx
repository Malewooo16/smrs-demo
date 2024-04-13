
import getActiveAdmissions from '@/actions/schools/findActiveAdmissions'
import AdmissionWraper from './AdmissionWraper'
import { ISchoolAdmission } from '@/utilities/admissionTypes'

export default  async function Admissions() {
  const activeAdmissions = await getActiveAdmissions()
  return (
    <div>
      <h1 className="text-xl text-center">Admissions</h1>
      <AdmissionWraper admissions={activeAdmissions} headers='admissions' />
    </div>
  )
}
