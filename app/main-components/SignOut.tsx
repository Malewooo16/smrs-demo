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
      className={` btn hover:btn-error hover:outline-0 pt-4 ps-0 `}
      onClick={handleLogout}
      disabled={loading}
    >
      <span className="text-lg">
        <RxExit />
      </span>
      Sign Out
    </button>
  );
}
