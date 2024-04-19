

import getAdmissionsParents from '@/actions/parents/getAdmissions'
import AdmissionMain from './AdmissionMain'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utilities/authOptions'

export default async function ParentPage() {
  const session = await getServerSession(authOptions)
  let parentId
  if(session?.user.parent)
    parentId = parseInt(session.user.parent)

  console.log(session)

  const admissions = await getAdmissionsParents(parentId)
  console.log(admissions)
  return (
    <AdmissionMain admissions={admissions} />
  )
}
