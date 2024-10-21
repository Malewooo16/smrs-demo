"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RxExit } from "react-icons/rx";

export default function SignOut() {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const handleLogout = async () => {
    setloading(true);
    const signOutData = await signOut({
      redirect: false,
    });

    return router.push(`/login`);
  };
  return (
    <button
      className={`flex items-center  hover:outline-0 py-auto hover:text-blue-700`}
      onClick={handleLogout}
      disabled={loading}
    >
      <span className="mr-3">
        <RxExit />
      </span>
      Sign Out
    </button>
  );
}
