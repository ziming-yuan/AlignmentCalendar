"use client";
import Link from "next/link";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { handleRegister } from "/app/_actions";

export default function Home() {
    const [error, setError] = useState("");
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const registerUser = async (data) => {
        setError("");
        const { success, error } = await handleRegister(data);
        if (success) {
            router.push("/");
        } else {
            setError(error);
        }
    };

    return (
        <main className="flex justify-center items-center min-h-screen">
            <div className="bg-white p-8 w-full max-w-lg">
                {/* Title and Icon */}
                <div className="flex items-center text-indigo-600 mb-8 justify-center">
                    <CalendarDaysIcon className="w-9 h-9 mr-4" />
                    <h1 className="text-3xl font-semibold">Advent Calendar</h1>
                </div>

                <p className="text-xl leading-5 text-gray-900 h-5 text-center mb-4">
                    Register for an account
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(registerUser)}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-tight text-slate-800 mb-2"
                        >
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="new-password"
                            className="w-full h-9 px-2 py-3 bg-white rounded border border-gray-300"
                            {...register("email", { required: true })}
                        />
                    </div>

                    <div className="mb-4 relative">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-tight text-slate-800 mb-2"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="new-password"
                            className="w-full h-9 px-2 py-3 bg-white rounded border border-gray-300"
                            {...register("password", { required: true })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full h-9 bg-indigo-600 rounded text-white font-medium mb-2"
                    >
                        Register
                    </button>

                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}

                    {(errors.email || errors.password) && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            All fields are required.
                        </div>
                    )}

                    <div className="text-sm mt-3 text-right text-gray-900">
                        Already have an account?{" "}
                        <Link href={"/"} className="underline">
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
}
