"use client";

import React, { useEffect, useState, Suspense } from "react";
import bridg from "bridg";
import { useSearchParams } from "next/navigation";
import SendToParent from "./SendResultsToParent";

interface Results {
  name: string;
  avg: string;
  scores: any;
  rank: any;
}

interface Student {
  id: number;
  name: string;
  results: Results[];
  parent: {
    email: string;
  } | null;
}

interface StudentData {
  id: number;
  name: string;
  parentEmail: string | null;
  scores: any;
  rank: any;
  avg: string;
  showRecords:boolean;
}

const RecordDetail = () => {
  const searchParams = useSearchParams();
  const recordName = searchParams.get("recordName");
  const [recordData, setRecordData] = useState<StudentData[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRecordData = async (name: string) => {
    try {
      const data = await bridg.classes.findUnique({
        where: {
          id: 1,
        },
        select: {
          StudentT: {
            include: {
              parent: {
                select: {
                  email: true,
                },
              },
            },
          },
        },
      });

      const filteredData = data?.StudentT.map((student) => {
        const semesterResult = student.results.find(
          //@ts-ignore
          (result) => result?.name === name,
        ) as Results | undefined;

        return semesterResult
          ? {
              id: student.id,
              name: student.name,
              parentEmail: student.parent?.email ?? null,
              scores: semesterResult.scores,
              rank: semesterResult.rank,
              avg: semesterResult.avg,
              showRecords:student.showRecords
            }
          : null;
      }).filter((student) => student !== null) as StudentData[];

      setRecordData(filteredData);
    } catch (error) {
      console.error("Error fetching record data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (recordName) {
      fetchRecordData(recordName);
    }
  }, [recordName]);

  if (!recordData) {
    return <div>No record selected.</div>;
  }

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded mb-4 w-1/4"></div>
          <div className="h-6 bg-gray-300 rounded mb-4 w-1/2"></div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Name", "Parent Email", "Scores", "Rank", "Avg"].map(
                  (header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(5)].map((_, idx) => (
                <tr key={idx}>
                  {[...Array(5)].map((_, idx) => (
                    <td key={idx} className="px-6 py-4 whitespace-nowrap">
                      <div className="h-6 bg-gray-300 rounded"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 transition-opacity duration-500 opacity-100">
      <h2 className="text-xl font-bold mb-4">Record Details: {recordName}</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {["Name", "Scores", "Rank", "Avg", "Send To Parent"].map(
              (header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {recordData?.map((student, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {Object.entries(student.scores).map(([subject, score]) => (
                  <div key={subject}>
                    {/* 
                    //@ts-ignore */}
                    {subject}: {score}
                  </div>
                ))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{student.rank}</td>
              <td className="px-6 py-4 whitespace-nowrap">{student.avg}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <SendToParent
                  studentId={student.id}
                  email={student.parentEmail as string}
                  semesterName={recordName as string}
                  showRecords={student.showRecords}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const RecordSuspense = () => (
  <Suspense fallback={<RecordDetail />}>
    <RecordDetail />
  </Suspense>
);

export default RecordSuspense;
