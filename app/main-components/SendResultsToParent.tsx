"use client";
import { sendResults } from "@/actions/parents/sendValidationEmailToParent";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SendToParent({
  studentId,
  email,
  semesterName,
  showRecords
}: {
  studentId: number;
  email: string;
  semesterName: string;
  showRecords:boolean
}) {
  const [disable, setDisable] = useState(false);
  const sendEmailToParent = async () => {
    const result = await sendResults(studentId, email, semesterName);
    if (result.success) {
      toast.success("Email Succesfully Sent");
      setDisable(true);
    } else {
      toast.error("An Error Occured");
    }
  };
  return (
    <button
      className="btn btn-success"
      disabled={!disable ? showRecords : disable}
      onClick={sendEmailToParent}
    >
      {" "}
      Send Results{" "}
    </button>
  );
}
