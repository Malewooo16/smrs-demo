"use server"

import prisma from "@/db/prisma"

export const getClassCourseDetails = async (courseId:number) => {

    try {
        const courseDetails = await prisma.classCourse.findFirst({
            where: {
              courseId:courseId
            },
            include:{
                teacher:true,
                class:{include:{StudentT:true}},
                course:true
            }
           
        })
        return courseDetails
    } catch (error) {
        console.log(error);
        return null
    }
    
}


// Function to get and mutate student class details based on courseId
export const getMutatedStudentDetails = async (courseId:number) => {
    try {
      // Await the promise from the `getStudentsClassDetails` function
      const students = await getStudentsClassDetails(courseId);
  
      // Process the students and map over them to filter courses and extract scores
      const mutatedStudent = (students && students.length > 0) ? students.map((student) => {
        // Filter the student's course enrollments based on the given courseId
        const filteredCourses = student.courseEnrollments.filter(
          (course) => course.courseId === courseId
        );
  
        // Extract the first score from the filtered courses or use an empty object if no match
        const score = filteredCourses.length > 0 ? filteredCourses[0].score : {};
  
        // Return the transformed student object with the required fields
        return {
          id: student.id,
          name: student.name,
          scores: score ? score : {}, // Returns only the score, not the entire array
        };
      }) : [];
  
      // Log the mutated student details
     // console.log(mutatedStudent);
      return mutatedStudent; // Return the mutated students if needed
  
    } catch (error) {
      console.error("Error fetching or processing student details:", error);
      return []; // Return an empty array in case of error
    }
  };
  
  // The initial function to fetch student class details
  export const getStudentsClassDetails = async (courseId:number) => {
    try {
      const data = await prisma.classCourse.findFirst({
        where: {
          courseId: courseId
        },
        include: {
          class: {
            include: {
              StudentT: { include: { courseEnrollments: true } }
            }
          }
        }
      });
      return data?.class?.StudentT || []; // Return students or an empty array
    } catch (error) {
      console.error("Error fetching students:", error);
      return []; // Return an empty array in case of error
    }
  };
  

