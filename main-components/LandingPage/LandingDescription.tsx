import React from 'react';

const LandingDescription = () => {
  return (
    <section className="bg-landing py-16 px-4">
      <div className="max-w-screen-xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-4xl font-bold text-white mb-4">Streamline School Management</h2>
        <p className="text-lg text-gray-300 mb-8">
          Simplify your school operations with a unified platform for student records, attendance tracking, communication, and more.
        </p>

        {/* Key Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white text-center p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Unified Record Management</h3>
            <p className="text-gray-600">
              Centralize student and school records, simplifying access and updates for staff and parents.
            </p>
          </div>
          
          <div className="bg-white text-center p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Real-Time Notifications</h3>
            <p className="text-gray-600">
              Keep parents, teachers, and administrators informed with real-time updates on student performance, attendance, and school announcements.
            </p>
          </div>

          <div className="bg-white text-center p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Automated Admissions</h3>
            <p className="text-gray-600">
              Streamline the admissions process with online forms, document uploads, and automated verification.
            </p>
          </div>

          <div className="bg-white text-center p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Analytics & Reporting</h3>
            <p className="text-gray-600">
              Generate insightful reports and track student performance to support data-driven decision-making.
            </p>
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="mt-10">
          <a
            href="/get-started"
            className="inline-block bg-navy text-white text-lg font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
};

export default LandingDescription;
