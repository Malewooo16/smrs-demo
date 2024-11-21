"use client"
import React, { useState } from 'react';

const EmailSignupSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., send the email to a backend or API
    setIsSubmitted(true);
  };

  return (
    <section className="bg-blue-900 text-white py-16 px-4 text-center">
      <div className="max-w-screen-xl mx-auto">
        {/* Headline */}
        <h2 className="text-4xl font-bold mb-4">Thousands of schools trust SMRS</h2>
        <p className="text-lg mb-8">
          Whether you're managing a small school or a large educational institution, SMRS is here to streamline your operations.
          Join the world’s most trusted platform for school management.
        </p>

        {/* Email Signup Form */}
        <form onSubmit={handleSubmit} className="flex justify-center items-center max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-2/3 lg:w-1/2 py-3 px-6 rounded-l-xl text-black"
            required
          />
          <button
            type="submit"
            className="bg-white text-blue-900 py-3 px-8 rounded-r-xl font-semibold hover:bg-blue-800 hover:text-white transition duration-300"
          >
            Get Started
          </button>
        </form>

        {isSubmitted && (
          <div className="mt-4 text-green-500 font-semibold">
            Thanks for signing up! We'll be in touch soon.
          </div>
        )}
      </div>
    </section>
  );
};

export default EmailSignupSection;
