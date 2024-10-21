"use client"


import { getClassCourseDetails } from '@/actions/courses/getClassCourseInfo';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import { FaBook, FaChalkboardTeacher, FaUsers } from 'react-icons/fa'; // FontAwesome icons

const CourseDetail = () => {
  const [courseDetail, setCourseDetail] = useState<any>();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams() as {courseId:string};
  

  useEffect(() => {
    if (params.courseId) {
      const fetchData = async () => {
        try {
          const response = await getClassCourseDetails(parseInt(params.courseId))
          setCourseDetail(response);
        } catch (err) {
          setError('Failed to fetch course details.');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [params.courseId]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-600">{error}</p>;

  return (
    <>
     <h1 className="text-xl font-bold my-6 px-2">Course Details</h1>
      <div className="flex flex-col  bg-white rounded-lg shadow-md overflow-hidden">
        <div className="w-full  bg-blue-100 p-4 border-b lg:border-b-0 lg:border-r">
          <nav className="flex justify-center">
            <button
              onClick={() => setActiveTab('overview')}
              className={`p-4 text-lg font-medium ${activeTab === 'overview' ? 'bg-blue-200' : 'hover:bg-blue-100'}`}
            >
              <FaBook className="inline mr-2" /> Overview
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`p-4 text-lg font-medium ${activeTab === 'students' ? 'bg-blue-200' : 'hover:bg-blue-100'}`}
            >
              <FaUsers className="inline mr-2" /> Students
            </button>
            <button
              onClick={() => setActiveTab('teacher')}
              className={`p-4 text-lg font-medium ${activeTab === 'teacher' ? 'bg-blue-200' : 'hover:bg-blue-100'}`}
            >
              <FaChalkboardTeacher className="inline mr-2" /> Teacher
            </button>
          </nav>
        </div>

        <div className="w-full lg:w-3/4 p-6">
          {activeTab === 'overview' && courseDetail && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{courseDetail.course.name} - {courseDetail.class.name}</h2>
              <p className="text-lg mb-4">{courseDetail.description}</p>
              <p><strong>Course Level:</strong> {courseDetail.courseLevel}</p>
              <p><strong>Tag For:</strong> {courseDetail.course.tagFor}</p>
            </div>
          )}
          {activeTab === 'students' && courseDetail && (
            <div className='w-full'>
              <h2 className="text-2xl font-semibold mb-4">Students List</h2>
              {courseDetail.class.StudentT && courseDetail.class.StudentT.length > 0 ? (
                <ul className="list-disc pl-5">
                  {courseDetail.class.StudentT.map((student: any) => (
                    <li key={student.id} className="mb-2">
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm">Admission ID: {student.admissionId}</div>
                     
                    </li>
                  ))}
                </ul>
                
              ) : (
                <p>No students data available.</p>
              )}
               <div className="flex justify-center w-full"> <button className='btn btn-success'> <Link href={`/tsubjects/results/${courseDetail.course.id}`}>View Students Records</Link> </button></div>
            </div>
          )}
          {activeTab === 'teacher' && courseDetail && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Teacher Information</h2>
              <p><strong>Name:</strong> {courseDetail.teacher.firstName} {courseDetail.teacher.lastName}</p>
              <p><strong>Email:</strong> {courseDetail.teacher.email}</p>
              <p><strong>Phone Number:</strong> {courseDetail.teacher.phoneNumber}</p>
              <p><strong>Identifier:</strong> {courseDetail.teacher.identifier}</p>
            </div>
          )}
        </div>
      </div>
    </>
 
  );
};

export default CourseDetail;
