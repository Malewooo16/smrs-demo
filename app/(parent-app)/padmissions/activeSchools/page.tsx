import React from 'react'
import ClientWrapper from './ClientWrapper'
import getActiveAdmissions from '@/actions/schools/findActiveAdmissions'

export default async function ActiveSchools() {
    const admission = await getActiveAdmissions()
    //console.log(admission)
  return (
    <div>
        <ClientWrapper admissions={admission} />
    </div>
  )
}
