"use client"

import { useState } from "react";

interface User {
    name: string;
    password: string;
    role?:string | null
  }
  
  interface GroupInfoProps {
    groupName: string;
    definition: string;
    users: User[];
  }
  
  const GroupInfo: React.FC<GroupInfoProps> = ({ groupName, definition, users }) => {
    const [showPasswords, setShowPasswords] = useState(false);
  
    return (
      <div className="border border-gray-300 rounded p-4">
        <h2 className="text-xl font-bold mb-2">{groupName}</h2>
        <p className="text-gray-600 mb-4">{definition}</p>
        <div className="mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => setShowPasswords(!showPasswords)}
          >
            {showPasswords ? "Hide Passwords" : "Show Passwords"}
          </button>
        </div>
        {showPasswords && (
          <ul>
            {users.map((user, index) => (
              <li key={index} className="mb-2">
                <span className="font-bold"> Username:{user.name}:</span>Password: {user.password} <span> Role: {user.role} </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  // Example usage:
  const users: User[] = [
    { name: "John", password: "password123" },
    { name: "Jane", password: "securepass" },
    { name: "Alice", password: "abc123" },
  ];
  
  const YourComponent: React.FC = () => {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">School Information</h1>
        <GroupInfo
          groupName="School"
          definition="A place of learning"
          users={users}
        />
      </div>
    );
  };

  export default GroupInfo
  