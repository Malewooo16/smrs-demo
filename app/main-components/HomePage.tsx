"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
// Define the FadeInComponent functional component
const HomePage = () => {
  // Declare a state variable to track if the component is visible
  const [isVisible, setIsVisible] = useState(false);

  // Use the useEffect hook to update the isVisible state when the component mounts
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Render the component with conditional Tailwind CSS classes for the fade-in effect
  return (
    <div
      className={` w-screen -mt-10 h-screen flex flex-col items-center justify-center  transition-opacity duration-1000 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col justify-center items-center">
        <Image
          className="w-30 rounded-full"
          src="/wma-logo.png"
          alt={"logo"}
          height={150}
          width={150}
          priority={true}
        />
        <h1 className="text-3xl"> Welcome To SMRS </h1>
      </div>
      <div className="flex flex-col  lg:flex-row  max-w-xl items-center justify-between mt-4">
        {" "}
        <Link href={`/register`}>
          {" "}
          <button className="btn btn-info min-w-40 my-2 mx-2">
            {" "}
            SignUp{" "}
          </button>{" "}
        </Link>
        <Link href={`/login`}>
          {" "}
          <button className="btn btn-info min-w-40 my-2 mx-2">
            {" "}
            Login{" "}
          </button>{" "}
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
