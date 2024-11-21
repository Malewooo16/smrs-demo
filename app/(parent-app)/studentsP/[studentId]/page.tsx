//@ts-nocheck
import prisma from "@/db/prisma";
import Image from "next/image";
import Link from "next/link";

// Main page component with tabs
export default async function StudentData({
  params,
  searchParams,
}: {
  params: {studentId: string};
  searchParams: {[key: string]: string | string[] | undefined};
}) {
  const student = await prisma.studentT.findUnique({
    where: {
      id: parseInt(params.studentId),
    },
    select: {
      name: true,
      results: true,
      school: {
        select: {
          name: true,
          address: true,
        },
      },
      studentData: {
        select: {
          firstName: true,
          lastName: true,
          imgUrl: true,
          homeAddress: true,
          dob: true,
        },
      },
    },
  });

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Student not found</p>
      </div>
    );
  }

  const {studentData, results} = student;
  const activeTab = searchParams.tab || "info"; // Default to 'info'

  return (
    <div className="container mx-auto p-4 bg-[#e0f7fa] min-h-screen">
      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-4">
        <Link
          href={`?tab=info`}
          className={`py-2 px-4 ${
            activeTab === "info"
              ? "border-b-2 border-teal-400 font-semibold"
              : "text-gray-500"
          }`}
        >
          Personal Info
        </Link>
        <Link
          href={`?tab=performance`}
          className={`py-2 px-4 ${
            activeTab === "performance"
              ? "border-b-2 border-teal-400 font-semibold"
              : "text-gray-500"
          }`}
        >
          Academic Performance
        </Link>
        <Link
          href={`?tab=scores`}
          className={`py-2 px-4 ${
            activeTab === "scores"
              ? "border-b-2 border-teal-400 font-semibold"
              : "text-gray-500"
          }`}
        >
          Scores
        </Link>
      </div>

      {/* Render content based on the active tab */}
      <div className="card w-full max-w-3xl bg-white p-6 shadow-md rounded-lg mx-auto">
        {activeTab === "info" && <PersonalInfo studentData={studentData} />}
        {activeTab === "performance" && (<AcademicPerformance results={results} /> )}
        {activeTab === "scores" && <Scores results={results} />}
      </div>
    </div>
  );
}

function PersonalInfo({studentData}: {studentData: any}) {
  const {firstName, lastName, imgUrl, homeAddress, dob} = studentData;

  return (
    <div className="flex flex-col items-center">
      <div className="w-36 h-36 relative rounded-full overflow-hidden mb-4">
        <Image src={imgUrl} fill alt={`${firstName} ${lastName}`} />
      </div>
      <h2 className="text-xl font-semibold mb-2">
        {firstName} {lastName}
      </h2>
      <p className="text-sm text-gray-600 mb-1">
        Date of Birth: {new Date(dob).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        Age: {new Date().getFullYear() - new Date(dob).getFullYear()}
      </p>
      <p className="text-sm text-gray-600">Address: {homeAddress}</p>
    </div>
  );
}

function AcademicPerformance({results}: {results: any[]}) {
  if (!results || results.length === 0) {
    return (
      <p className="text-gray-500">No academic performance data available.</p>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Academic Performance</h2>
      <ul className="space-y-3">
        {results.map((result: any, index: number) => (
          <li key={index} className="border rounded-lg p-4 bg-gray-50">
            <p className="font-semibold">Term: {result.name}</p>
           {result.showRecords ?  <div>
           <p>Average: {result.avg}</p>
           <p>Rank: {result.rank}</p>
           </div> : <p class="my-2">Results Not Published.</p> }
          </li>
        ))}
      </ul>
    </div>
  );
}

function Scores({ results }: { results: any[] }) {
  // Grade calculation logic
  const getGrade = (score: number): string => {
    if (score >= 80) return "A";
    if (score >= 65) return "B";
    if (score >= 50) return "C";
    if (score >= 30) return "D";
    return "F";
  };

  if (!results || results.length === 0) {
    return <p className="text-gray-500">No scores available.</p>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Scores by Term</h2>
      <div className="space-y-6">
        {results.map((result: any, index: number) => (
          <div key={index} className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-bold text-teal-600 mb-2">
              {result.name}
            </h3>
            {result.showRecords ? <ul className="space-y-2">
              {Object.entries(result.scores).map(([subject, score]) => {
                const numericScore = parseInt(score);
                return (
                  <li
                    key={subject}
                    className="flex justify-between items-center border-b pb-1 last:border-none"
                  >
                    <span className="text-gray-700">{subject}</span>
                    <div className="flex items-center space-x-4">
                      <span className="font-semibold text-teal-800">
                        {numericScore}
                      </span>
                      <span className="text-sm font-medium text-gray-500">
                        Grade: {getGrade(numericScore)}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul> : <p class="text-teal-800 my-2">Results Not Published.</p>}
          </div>
        ))}
      </div>
    </div>
  );
}


