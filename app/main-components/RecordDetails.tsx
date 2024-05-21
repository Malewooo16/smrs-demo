"use client";

import React, { useEffect, useState } from "react";
import bridg from "bridg";
import { useSearchParams } from "next/navigation";

const RecordDetail = () => {
  const searchParams = useSearchParams();
  const recordName = searchParams.get("recordName");
  const [recordData, setRecordData] = useState(null);

  useEffect(() => {
    if (recordName) {
      fetchRecordData(recordName);
    }
  }, [recordName]);

  const fetchRecordData = async (name) => {
    try {
      const data = await bridg.classes.findUnique({
        where: {
          id: 1,
        },
        select: {
          StudentT: true,
        },
      });
      setRecordData(data);
    } catch (error) {
      console.error("Error fetching record data:", error);
    }
  };

  if (!recordName) {
    return <div>No record selected.</div>;
  }

  if (!recordData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Record Details: {recordName}</h2>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(recordData, null, 2)}
      </pre>
    </div>
  );
};

export default RecordDetail;
