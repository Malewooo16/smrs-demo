
import PCalender from '@/app/main-components/PCalender'
import { authOptions } from '@/utilities/authOptions'
import { getServerSession } from 'next-auth'

export default async function Dashboard() {

  const session= await getServerSession(authOptions)
  //console.log("Session", session);
  
  return (
    <div className='mx-2'>
    <div className=""><h1 className="text-3xl text-center mt-5 ms-5"> Welcome To Your Dashboard {session?.user.role}  </h1></div>
    <PCalender />
  
    </div>
 
  )
}
