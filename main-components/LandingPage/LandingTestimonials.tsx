import React from 'react';

const TestimonialSection = () => {
  return (
    <section className="bg-gray-800 py-16 px-4 text-white">
      <div className="max-w-screen-xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-4xl font-bold mb-6">What Our Users Are Saying</h2>
        <p className="text-lg mb-12">
          See how SMRS is making school management easier for administrators, teachers, and parents.
        </p>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white text-blue-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
            <p className="text-xl italic mb-4">
              "SMRS has revolutionized how we manage student records and communicate with parents. It's so easy to use!"
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-900 text-white flex items-center justify-center mr-4">
                <span className="font-semibold text-lg">T</span>
              </div>
              <div>
                <h4 className="font-semibold">Tina Johnson</h4>
                <p className="text-gray-500">Teacher</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white text-blue-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
            <p className="text-xl italic mb-4">
              "The real-time notifications have been incredibly helpful in keeping me updated on my child's progress."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-900 text-white flex items-center justify-center mr-4">
                <span className="font-semibold text-lg">P</span>
              </div>
              <div>
                <h4 className="font-semibold">Paul Adams</h4>
                <p className="text-gray-500">Parent</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white text-blue-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
            <p className="text-xl italic mb-4">
              "I can now easily manage attendance, grades, and communications all in one place. A huge time-saver!"
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-900 text-white flex items-center justify-center mr-4">
                <span className="font-semibold text-lg">A</span>
              </div>
              <div>
                <h4 className="font-semibold">Alex Brown</h4>
                <p className="text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
