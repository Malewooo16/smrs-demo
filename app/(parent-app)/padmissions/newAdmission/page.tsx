

import getAdmissionsParents, { getUnresolvedAdmissions } from '@/actions/parents/getAdmissions'
import AdmissionMain from './AdmissionMain'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utilities/authOptions'
import { redirect } from 'next/navigation'

export default async function ParentPage() {
  const session = await getServerSession(authOptions)
  let parentId
  if(session?.user.parent){
    parentId = parseInt(session.user.parent)

    //const admissions = await getAdmissionsParents(parentId);
    const previous = await getUnresolvedAdmissions(parentId);
    //console.log(previous)
    return (
      <AdmissionMain admissions={previous} />
    )
  }else{
    redirect(`/login`)
  }
  
}
