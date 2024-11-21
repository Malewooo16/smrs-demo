"use client";

import { useState } from "react";

export default function ClientTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <div>
      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-4">
        <button
          onClick={() => setActiveTab("details")}
          className={`py-2 px-4 ${
            activeTab === "details"
              ? "border-b-2 border-indigo-500 font-semibold"
              : "text-gray-500"
          }`}
        >
          Course Details
        </button>
        <button
          onClick={() => setActiveTab("reports")}
          className={`py-2 px-4 ${
            activeTab === "reports"
              ? "border-b-2 border-indigo-500 font-semibold"
              : "text-gray-500"
          }`}
        >
          Weekly Reports
        </button>
        <button
          onClick={() => setActiveTab("edit")}
          className={`py-2 px-4 ${
            activeTab === "edit"
              ? "border-b-2 border-indigo-500 font-semibold"
              : "text-gray-500"
          }`}
        >
          Edit Details
        </button>
      </div>
    </div>
  );
}
