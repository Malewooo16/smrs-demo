"use client"
import React, { useState } from 'react';

const Transition = () => {
    const [isActive1, setIsActive1] = useState(true);
    const [isActive2, setIsActive2] = useState(false);
  
    const toggleComponent1 = () => {
      setIsActive1(!isActive1);
      setIsActive2(false); // Deactivate component 2
    };
  
    const toggleComponent2 = () => {
      setIsActive2(!isActive2);
      setIsActive1(false); // Deactivate component 1
    };
  
    return (
      <div className="flex justify-center items-center h-screen">
        <div className={`mx-5 transition-opacity duration-1000 transition-height ease-in-out ${
          isActive1 ? 'opacity-100' : 'opacity-0 h-0 pointer-events-none'
        }`}>
          <button
            onClick={toggleComponent2}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isActive1 ? 'bg-blue-700' : ''
            }`}
          >
            Toggle Component 1
          </button>
          <div
            className={`mt-4 p-4 bg-gray-200 ${
              isActive1 ? 'opacity-100 h-auto' : 'opacity-0 h-0 pointer-events-none'
            }`}
          >
            {/* Content of component 1 */}
            <h1>Component 1 Active</h1>
          </div>
        </div>
        <div className={`transition-opacity duration-1000  ${
          isActive2 ? 'opacity-100' : 'opacity-0  pointer-events-none'
        }`}>
          <button
            onClick={toggleComponent1}
            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isActive2 ? 'bg-green-700' : ''
            }`}
          >
            Toggle Component 2
          </button>
          <div
            className={`mt-4 p-4 bg-gray-200 ${
              isActive2 ? 'opacity-100 h-auto' : 'opacity-0 h-0 pointer-events-none'
            }`}
          >
            {/* Content of component 2 */}
            <h1>Component 2 Active</h1>
          </div>
        </div>
      </div>
    );
};

export default Transition;
