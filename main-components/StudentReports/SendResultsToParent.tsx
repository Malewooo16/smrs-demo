"use client";

import { sendResults } from "@/actions/parents/sendValidationEmailToParent";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SendToParentResultsBtn({
  studentId,
  email,
  semesterName,
  showRecords,
  term,
}: {
  studentId: number;
  email: string;
  semesterName: string;
  showRecords: boolean;
  term: string;
}) {
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmailToParent = async () => {
    setLoading(true); // Start loading
    setDisable(true);

    try {
      const result = await sendResults(studentId, email, semesterName, term);

      if (result.success) {
        toast.success("Email Successfully Sent");
      } else {
        toast.error("An Error Occurred");
        setDisable(false); // Re-enable if there was an error
      }
    } catch (error) {
      toast.error("An Error Occurred");
      setDisable(false); // Re-enable if there was an error
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <button
      className={`btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={showRecords || disable || loading}
      onClick={sendEmailToParent}
    >
      {loading ? <span className="loading loading-spinner loading-md"></span> : "Send Results"}
    </button>
  );
}
