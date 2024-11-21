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
      <h3 className="text-lg font-semibold mb-2">Father&apos;s Information</h3>
      <div className="mb-4">
        <label className="block text-md font-medium mb-2">Father&apos;s Full Name</label>
        <input
          type="text"
          placeholder="Father's Full Name"
          className="input input-bordered w-full"
          value={formData.father?.name || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              father: { ...formData.father, name: e.target.value },
            })
          }
        />
      </div>
      <div className="mb-4">
        <label className="block text-md font-medium mb-2">Father&apos;s Phone Number</label>
        <input
          type="tel"
          placeholder="Father's Phone Number"
          className="input input-bordered w-full"
          value={formData.father?.phone || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              father: { ...formData.father, phone: e.target.value },
            })
          }
        />
      </div>
      <div className="mb-4">
        <label className="block text-md font-medium mb-2">Father&apos;s Email Address</label>
        <input
          type="email"
          placeholder="Father's Email"
          className="input input-bordered w-full"
          value={formData.father?.email || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              father: { ...formData.father, email: e.target.value },
            })
          }
        />
      </div>
      <div className="mb-4">
        <label className="block text-md font-medium mb-2">Father&apos;s Occupation</label>
        <input
          type="text"
          placeholder="Father's Occupation"
          className="input input-bordered w-full"
          value={formData.father?.occupation || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              father: { ...formData.father, occupation: e.target.value },
            })
          }
        />
      </div>

      <div className="border-b w-full my-4"></div>

      {/* Mother's Information */}
      <h3 className="text-lg font-semibold mb-2">Mother&apos;s Information</h3>
      <div className="mb-4">
        <label className="block text-md font-medium mb-2">Mother&apos;s Full Name</label>
        <input
          type="text"
          placeholder="Mother's Full Name"
          className="input input-bordered w-full"
          value={formData.mother?.name || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              mother: { ...formData.mother, name: e.target.value },
            })
          }
        />
      </div>
      <div className="mb-4">
        <label className="block text-md font-medium mb-2">Mother&apos;s Phone Number</label>
        <input
          type="tel"
          placeholder="Mother's Phone Number"
          className="input input-bordered w-full"
          value={formData.mother?.phone || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              mother: { ...formData.mother, phone: e.target.value },
            })
          }
        />
      </div>
      <div className="mb-4">
        <label className="block text-md font-medium mb-2">Mother&apos;s Email Address</label>
        <input
          type="email"
          placeholder="Mother's Email"
          className="input input-bordered w-full"
          value={formData.mother?.email || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              mother: { ...formData.mother, email: e.target.value },
            })
          }
        />
      </div>
      <div className="mb-4">
        <label className="block text-md font-medium mb-2">Mother&apos;s Occupation</label>
        <input
          type="text"
          placeholder="Mother's Occupation"
          className="input input-bordered w-full"
          value={formData.mother?.occupation || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              mother: { ...formData.mother, occupation: e.target.value },
            })
          }
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
  const [parent, setParent] = useState("father"); // Default to "father"

  // Get the selected parent's data dynamically
  const selectedParentData = formData[parent] || {};
//console.log(formData)
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Step 4: Confirm Contact Information</h2>
      <p className="mb-4 text-lg">
        Please confirm the parent/guardian contact details for communication:
      </p>

      {/* Dropdown to select parent */}
      <select
        className="input-base select w-full my-4"
        onChange={(e) => setParent(e.target.value.toLowerCase())}
        value={parent}
      >
        <option disabled value="">
          Select Parent
        </option>
        <option value="father">Father</option>
        <option value="mother">Mother</option>
      </select>

      {/* Display selected parent's contact details */}
      <div className="mb-4">
        <p>
          <strong>Name:</strong> {selectedParentData.name || "N/A"}
        </p>
        <p>
          <strong>Phone:</strong> {selectedParentData.phone || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {selectedParentData.email || "N/A"}
        </p>
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
    <div className="bg-white p-6 rounded-md shadow-md max-w-3xl mx-auto my-4">
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
