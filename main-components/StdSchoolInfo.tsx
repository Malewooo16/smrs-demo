import React from 'react';
import { getSchoolInfoParent } from "@/actions/schools/getSchoolInfo";

type School = {
  id: number;
  name: string;
  address: string;
  emailAddress: string;
  phoneNumber: string;
  website: string;
};

type SchoolData = {
  school: School;
};

export default async function SchoolInfo() {
  const schoolsData: SchoolData[] = await getSchoolInfoParent();

  // Function to filter out recurring schools
  const uniqueSchools = Array.from(new Map(schoolsData.map(item => [item.school.id, item.school])).values());

  return (
    <div className="p-4 w-1/2">
      <h2 className="text-2xl mb-4">School Information</h2>
      <ul className="space-y-4">
        {uniqueSchools.map(school => (
          <li key={school.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <strong className="text-xl">{school.name}</strong>
            <p className="mt-2">Address: {school.address}</p>
            <p className="mt-2">Email: <a href={`mailto:${school.emailAddress}`} className="text-blue-500">{school.emailAddress}</a></p>
            <p className="mt-2">Phone: <a href={`tel:${school.phoneNumber}`} className="text-blue-500">{school.phoneNumber}</a></p>
            <p className="mt-2">Website: <a href={`http://${school.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">{school.website}</a></p>
          </li>
        ))}
      </ul>
    </div>
  );
}
