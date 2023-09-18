"use client";
import Link from "next/link";
import {
    CalendarDaysIcon,
    EyeIcon,
    EyeSlashIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { handleRegister } from "/app/_actions";

export default function Register() {
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [accountCreated, setAccountCreated] = useState(false);
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
            setAccountCreated(true);
            setTimeout(() => {
                router.push("/");
            }, 2000);
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
                    <h1 className="text-3xl font-semibold">
                        Alignment Calendar
                    </h1>
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
                            placeholder="Enter email address"
                            className="w-full p-2 bg-white rounded border border-gray-300 text-sm"
                            {...register("email", {
                                required: "Email is required",
                            })}
                        />
                        {errors.email && (
                            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                                {errors.email.message}
                            </div>
                        )}
                    </div>

                    {/* Password field */}
                    <div className="mb-4 relative">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-tight text-slate-800 mb-2"
                        >
                            Password
                        </label>
                        <div className="flex relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                placeholder="At least 8 characters, 1 special"
                                className="w-full p-2 bg-white rounded border border-gray-300 pr-10 text-sm"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message:
                                            "Password should be at least 8 characters",
                                    },
                                    pattern: {
                                        value: /^(?=.*[0-9])/,
                                        message:
                                            "Password should contain at least one number",
                                    },
                                })}
                            />
                            <div
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                            >
                                {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
                            </div>
                        </div>

                        {errors.password && (
                            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                                {errors.password.message}
                            </div>
                        )}
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

                    {accountCreated && (
                        <div className="bg-green-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            Account created successfully! Redirecting...
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
