"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";

const RecordList = ({ records }: { records: { name: string }[] }) => {
  const router = useRouter();

  const handleRecordClick = (recordName: any) => {
    const searchParams = new URLSearchParams();
    searchParams.set("recordName", recordName);
    router.push(`/hmRecords/1?${searchParams.toString()}`);
  };

  return (
    <div className="p-4 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Records</h1>
      <ul className="flex pl-5 space-x-6 max-w-xl">
        {records.map((record) => (
          <li
            key={record.name}
            className="cursor-pointer text-blue-500 hover:underline"
            onClick={() => handleRecordClick(record.name)}
          >
            {record.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordList;
