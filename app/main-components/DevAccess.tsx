"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DevAccess() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setLoading(true);

    const signInData = await signIn("dev", {
      passwords: password,
      redirect: false,
    });
    if (signInData?.error) {
      setLoading(false);
      toast.error("Login Error!! Please check credentials");
      console.log(signInData);
    } else {
      router.push("/devDash");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
        <label className="block text-gray-700 text-xl font-bold mb-2">
            Dev Access
          </label>
        <input type="password" placeholder="Enter Here" className="input input-bordered w-full max-w-xs" onChange={(e)=>setPassword(e.target.value)} />
        </div>

        {!loading ? (
          <button className="btn  my-4 bg-base-300" type="submit">
            {" "}
            Login{" "}
          </button>
        ) : (
          <button className="btn  my-4 bg-base-300">
            {" "}
            <span className="loading loading-bars loading-sm"></span>{" "}
          </button>
        )}
      </form>
    </div>
  );
}
