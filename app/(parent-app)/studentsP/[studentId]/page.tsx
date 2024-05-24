
//@ts-nocheck
import prisma from "@/db/prisma"
import Image from "next/image";


export default async function StudentData({params}:{params:{studentId:string}}) {
    const student = await prisma.studentT.findUnique({
        where:{
            id:parseInt(params.studentId as string)
        },
        include:{
            class:{include:{school:true}},
            studentData:true

        }
    })
    if(student){
        return (
            <div className="  min-h-screen flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg shadow-md w-full xl:max-w-xl">
                <h1 className="text-2xl font-bold">{student.name}</h1>
                <p>Class: {student.class?.name}</p>
                <p>School: {student.class?.school?.name}</p>
                <div className="flex items-center justify-center"><Image width={250} height={250} src={student.studentData?.imgUrl as string} alt={`${student.name}`} className=" mt-4" /></div>
        
                {student.showRecords && (
                  <div className="mt-4">
                    <h2 className="text-lg font-bold">Results:</h2>
                    {student.results.map((result, index) => (
                      <div key={index} className="mt-2">
                        <h3 className="text-md font-bold">{result?.name}</h3>
                        <p>Rank: {result.rank}</p>
                        <p>Scores:</p>
                        <ul className="list-disc pl-4">
                          {Object.entries(result.scores).map(([subject, score], i) => (
                            <li key={i}>
                              {subject}: {score}
                            </li>
                          ))}
                        </ul>
                        {result.avg && <p>Average: {result.avg}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
    }
    
}
