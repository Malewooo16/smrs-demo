



interface StudentData {
    imgUrl: string;
  }
  
  interface ClassInfo {
    name: string;
  }
  
  interface Student {
    name: string;
    studentData: StudentData;
    class: ClassInfo;
  }


import prisma from "@/db/prisma";
import { authOptions } from "@/utilities/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default  async function StudentsInformation() {
 
   
    
 
    const session = await getServerSession(authOptions);
    if(session?.user){
      const students = await prisma.studentT.findMany({
        where:{
          parentId:parseInt(session.user.parent as string)
        },
        select:{
          name:true,
          studentData:{
            select:{
              imgUrl:true
            }
            
          },
          class:{
            select:{
              name:true
            }
          }
          
        },
       
      })
    
      return (
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold my-8">Student List</h1>
          <div className="flex flex-wrap -mx-2">
            {students.map((student, index:any) => (
              <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg m-4">
                <Image
                  className="w-full h-48 object-cover"
                  src={student.studentData?.imgUrl as string}
                  alt={student.name}
                  width={250}
                  height={250}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{student.name}</div>
                  <p className="text-gray-700 text-base">{student.class?.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    else{
      return null
    }
}
