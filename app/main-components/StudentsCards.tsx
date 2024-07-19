import { getStudentForParent } from "@/actions/students/getStudentInfo";
import Link from "next/link";
import Image from "next/image";


export default async function StudentsCards() {
    const students = await getStudentForParent()

    return(
        <div className="flex flex-wrap -mx-2">
          {students.map((student, index:any) => (
           <Link href={`/studentsP/${student.id}`}  key={index}> <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
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
         </div></Link>
          ))}
        </div>
    )
}