'use client'
import Link from "next/link";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("All fields are necessary");
            return;
        }
        try {
            const resUserExists = await fetch("api/userExists", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email }),
            });
            const {user} = await resUserExists.json();
            if (user) {
              setError("User exists");
              return;
            }

            const res = await fetch("api/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email,
                  password,
                }),
            });
            if (res.ok) {
                const form = e.target;
                form.reset();
                setError("");
                router.push("/");
            } else {
                console.log("User registration failed.");
            }
        } catch (error) {
            console.log("Error during registration: ", error);
        }
    }

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
          <form onSubmit={handleSubmit}>
              <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium leading-tight text-slate-800 mb-2">Email Address</label>
                  <input
                    onChange={e=>setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full h-9 px-2 py-3 bg-white rounded border border-gray-300" />
              </div>
              
              <div className="mb-4 relative">
                  <label htmlFor="password" className="block text-sm font-medium leading-tight text-slate-800 mb-2">Password</label>
                  <input
                    onChange={e=>setPassword(e.target.value)}
                    type="password"
                    placeholder="Enter your password"
                    className="w-full h-9 px-2 py-3 bg-white rounded border border-gray-300" />
              </div>

              <button type="submit" className="w-full h-9 bg-indigo-600 rounded text-white font-medium mb-2">Register</button>

              {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
                </div>
               )}

              <div className="text-sm mt-3 text-right text-gray-900">
                Already have an account? <Link href={"/"} className="underline">Login</Link>
               </div>
          </form>
      </div>
    </main>
  )
}