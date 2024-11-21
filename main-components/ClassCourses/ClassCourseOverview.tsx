"use client"


import { getClassCourseDetails } from '@/actions/courses/getClassCourseInfo';
import Link from 'next/link';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import { FaBook, FaChalkboardTeacher, FaUsers } from 'react-icons/fa'; // FontAwesome icons
import { TbReportAnalytics } from "react-icons/tb";
import ClassCourseWeeklyReportForm from './ClassCourseWeeklyReportForm';

const CourseDetail = () => {
  const [courseDetail, setCourseDetail] = useState<any>();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams() as {courseId:string};
  const searchParams = useSearchParams();
  const classId = searchParams.get('class');
  

  useEffect(() => {
    if (params.courseId) {
      const fetchData = async () => {
        try {
          const response = await getClassCourseDetails(parseInt(params.courseId), parseInt(classId as string));
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

  const classCourseName = `${courseDetail.course.name} ${courseDetail.courseLevel}`

  return (
    <>
     <h1 className="text-xl font-bold my-3 px-2">Course Details</h1>
      <div className="flex flex-col  bg-white rounded-lg shadow-md overflow-hidden">
        <div className="w-full bg-blue-50 p-4 border-b">
        <nav className="flex space-x-4 border-b">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-6 py-2 text-lg font-semibold transition-colors duration-200 ${
            activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <FaBook className="inline mr-2" /> Overview
        </button>
        <button
          onClick={() => setActiveTab('students')}
          className={`px-6 py-2 text-lg font-semibold transition-colors duration-200 ${
            activeTab === 'students' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <FaUsers className="inline mr-2" /> Students
        </button>
        <button
          onClick={() => setActiveTab('teacher')}
          className={`px-6 py-2 text-lg font-semibold transition-colors duration-200 ${
            activeTab === 'teacher' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <FaChalkboardTeacher className="inline mr-2" /> Teacher
        </button>
        <button
          onClick={() => setActiveTab('report')}
          className={`px-6 py-2 text-lg font-semibold transition-colors duration-200 ${
            activeTab === 'report' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <TbReportAnalytics className="inline mr-2" /> Report
        </button>
      </nav>
        </div>

        <div className="w-full lg:w-full p-6">
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
                    </li>
                  ))}
                </ul>
                
              ) : (
                <p>No students data available.</p>
              )}
               <div className="flex justify-center w-full"> <button className='btn btn-success'> <Link href={`/tsubjects/results/${courseDetail.course.id}?class=${classId}`}>View Students Records</Link> </button></div>
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
          {activeTab === 'report' && courseDetail && (
           <div className="w-full flex justify-center"><ClassCourseWeeklyReportForm classCourseId={courseDetail.id} classCourseName={classCourseName} /> </div>
          )}
        </div>
      </div>
    </>
 
  );
};

export default CourseDetail;
