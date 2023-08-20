'use client'
import Link from "next/link";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useState } from 'react';

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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
            Register for an account
          </p>
          
          {/* Form */}
          <form>
              <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium leading-tight text-slate-800 mb-2">Email Address</label>
                  <input type="email" id="email" name="email" placeholder="Enter your email" className="w-full h-9 px-2 py-3 bg-white rounded border border-gray-300" />
              </div>
              
              <div className="mb-4 relative">
                  <label htmlFor="password" className="block text-sm font-medium leading-tight text-slate-800 mb-2">Password</label>
                  <input type="password" id="password" name="password" placeholder="Enter your password" className="w-full h-9 px-2 py-3 bg-white rounded border border-gray-300" />
              </div>

              <div>
                  <button type="submit" className="w-full h-9 bg-indigo-600 rounded text-white font-medium mb-2">Register</button>
              </div>

              <div className="text-sm mt-3 text-right text-gray-900">
                Already have an account? <Link href={"/"} className="underline">Login</Link>
               </div>
          </form>
      </div>
    </main>
  )
}