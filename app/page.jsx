'use client'

import Link from "next/link";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.error) {
        setError("Invalid Credentials");
        return;
      }
      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 w-full max-w-lg"> 
          {/* Title and Icon */}
          <div className="flex items-center text-indigo-600 mb-8 justify-center">
            <CalendarDaysIcon className="w-9 h-9 mr-4" />
            <h1 className="text-3xl font-semibold">
              Advent Calendar
            </h1>
          </div>
          
          <p className="text-xl leading-5 text-gray-900 h-5 text-center mb-4">
            Sign into your account
          </p>
          
          {/* Form */}
          <form onSubmit={handleSubmit}>
              <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium leading-tight text-slate-800 mb-2">Email Address</label>
                  <input 
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full h-9 px-2 py-3 bg-white rounded border border-gray-300" />
              </div>
              
              <div className="mb-4 relative">
                  <label htmlFor="password" className="block text-sm font-medium leading-tight text-slate-800 mb-2">Password</label>
                  <input
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="Enter your password"
                    className="w-full h-9 px-2 py-3 bg-white rounded border border-gray-300" />
                  <a href="#" className="absolute right-0 top-0 text-indigo-600 text-sm font-medium leading-tight">Forgot Password?</a>
              </div>

              <div className="mb-4 flex items-center">
                  <input type="checkbox" id="remember" name="remember" className="rounded border border-gray-300" />
                  <label htmlFor="remember" className="ml-2 text-gray-900 text-xs font-normal leading-tight">Remember me</label>
              </div>

              <div>
                  <button type="submit" className="w-full h-9 bg-indigo-600 rounded text-white font-medium mb-2">Sign in</button>
              </div>

              {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                  {error}
                </div>
              )}

              <div className="text-sm mt-3 text-right text-gray-900">
                Don't have an account? <Link href={"/register"} className="underline">Register</Link>
               </div>
          </form>
      </div>
    </main>
  )
}