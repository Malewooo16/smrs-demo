import prisma from "@/db/prisma";
import { authOptions } from "@/utilities/authOptions"
import { getServerSession } from "next-auth"



export default async  function Gantts() {
  const session = await getServerSession(authOptions);
  if(session?.user){
    const students = await prisma.parent.findUnique({
      where:{
        id:parseInt(session.user.parent as string)
      },
      include:{
        StudentT:true
      }
    })
    console.log(students?.StudentT)
    return(
      <pre> {JSON.stringify(students?.StudentT, null, 2)} </pre>
    )
  }
  else{
    return null
  }
}
