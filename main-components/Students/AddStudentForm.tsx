//@ts-nocheck
"use client";

import React, { useState } from "react";

// Components for each step
const StepOne = ({ formData, setFormData }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Step 1: Student Information</h2>
      <div className="mb-4">
        <label className="block text-md font-medium mb-2">First Name</label>
        <input
          type="text"
          placeholder="Student's Full Name"
          className="input input-bordered w-full"
          value={formData.studentName}
          onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-md font-medium mb-2">Last Name</label>
        <input
          type="text"
          placeholder="Student's Full Name"
          className="input input-bordered w-full"
          value={formData.studentName}
          onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-md font-medium mb-2">Home Address</label>
        <input
          type="text"
          placeholder="Student's Full Name"
          className="input input-bordered w-full"
          value={formData.studentName}
          onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-md font-medium mb-2">Date of Birth</label>
        <input
          type="date"
          className="input input-bordered w-full"
          value={formData.dateOfBirth}
          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
        />
      </div>
    </div>
  );
};

const StepTwo = ({ formData, setFormData }) => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Step 2: Parent/Guardian Information</h2>
  
        {/* Father's Information */}
        <h3 className="text-lg font-semibold mb-2">Father`&apos;`s Information</h3>
        <div className="mb-4">
          <label className="block text-md font-medium mb-2">Father`&apos;`s Full Name</label>
          <input
            type="text"
            placeholder="Father's Full Name"
            className="input input-bordered w-full"
            value={formData.fatherName}
            onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-md font-medium mb-2">Father`&apos;`s Phone Number</label>
          <input
            type="tel"
            placeholder="Father's Phone Number"
            className="input input-bordered w-full"
            value={formData.fatherPhone}
            onChange={(e) => setFormData({ ...formData, fatherPhone: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-md font-medium mb-2">Father`&apos;`s Email Address</label>
          <input
            type="email"
            placeholder="Father's Email"
            className="input input-bordered w-full"
            value={formData.fatherEmail}
            onChange={(e) => setFormData({ ...formData, fatherEmail: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-md font-medium mb-2">Father`&apos;`s Occupation</label>
          <input
            type="text"
            placeholder="Father's Occupation"
            className="input input-bordered w-full"
            value={formData.fatherOccupation}
            onChange={(e) => setFormData({ ...formData, fatherOccupation: e.target.value })}
          />
        </div>
  
        {/* Mother's Information */}
        <h3 className="text-lg font-semibold mb-2 mt-6">Mother`&apos;`s Information</h3>
        <div className="mb-4">
          <label className="block text-md font-medium mb-2">Mother`&apos;`s Full Name</label>
          <input
            type="text"
            placeholder="Mother's Full Name"
            className="input input-bordered w-full"
            value={formData.motherName}
            onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-md font-medium mb-2">Mother`&apos;`s Phone Number</label>
          <input
            type="tel"
            placeholder="Mother's Phone Number"
            className="input input-bordered w-full"
            value={formData.motherPhone}
            onChange={(e) => setFormData({ ...formData, motherPhone: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-md font-medium mb-2">Mother`&apos;`s Email Address</label>
          <input
            type="email"
            placeholder="Mother's Email"
            className="input input-bordered w-full"
            value={formData.motherEmail}
            onChange={(e) => setFormData({ ...formData, motherEmail: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-md font-medium mb-2">Mother`&apos;`s Occupation</label>
          <input
            type="text"
            placeholder="Mother's Occupation"
            className="input input-bordered w-full"
            value={formData.motherOccupation}
            onChange={(e) => setFormData({ ...formData, motherOccupation: e.target.value })}
          />
        </div>
      </div>
    );
  };
  

const StepThree = ({ formData, setFormData }) => {
  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Step 3: Upload Documents</h2>
      <div className="mb-4">
        <label className="block text-md font-medium mb-2">Birth Certificate</label>
        <input
          type="file"
          name="birthCertificate"
          className="file-input file-input-bordered w-full"
          onChange={handleFileChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-md font-medium mb-2">Transcript</label>
        <input
          type="file"
          name="transcript"
          className="file-input file-input-bordered w-full"
          onChange={handleFileChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-md font-medium mb-2">Medical Records</label>
        <input
          type="file"
          name="medicalRecords"
          className="file-input file-input-bordered w-full"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

const StepFour = ({ formData }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Step 4: Confirm Contact Information</h2>
      <p className="mb-4 text-lg">Please confirm the parent/guardian contact details for communication:</p>
      <div className="mb-4">
        <p><strong>Name:</strong> {formData.parentName}</p>
        <p><strong>Phone:</strong> {formData.parentPhone}</p>
        <p><strong>Email:</strong> {formData.parentEmail}</p>
      </div>
    </div>
  );
};

// Main Component
const AddStudentForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    studentName: "",
    dateOfBirth: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    birthCertificate: null,
    transcript: null,
    medicalRecords: null,
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    console.log("Form Submitted:", formData);
    // Submit the form data to backend
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Student Admission Form</h1>
      <div className="mb-4">
        {step === 1 && <StepOne formData={formData} setFormData={setFormData} />}
        {step === 2 && <StepTwo formData={formData} setFormData={setFormData} />}
        {step === 3 && <StepThree formData={formData} setFormData={setFormData} />}
        {step === 4 && <StepFour formData={formData} />}
      </div>

      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button onClick={prevStep} className="btn btn-outline btn-primary">
            Previous
          </button>
        )}
        {step < 4 && (
          <button onClick={nextStep} className="btn btn-primary">
            Next
          </button>
        )}
        {step === 4 && (
          <button onClick={handleSubmit} className="btn btn-success">
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default AddStudentForm;
