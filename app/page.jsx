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
import { signIn } from "next-auth/react";

export default function Home() {
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
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

    const loginUser = async (formData) => {
        setError("");
        const email = formData.email;
        const password = formData.password;
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
            router.push("/dashboard");
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
                        Alignment Calendar
                    </h1>
                </div>

                <p className="text-xl leading-5 text-gray-900 h-5 text-center mb-4">
                    Sign into your account
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(loginUser)}>
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
                            autoComplete="current-password"
                            className="w-full p-2 bg-white rounded border border-gray-300 text-sm"
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
                        <div className="flex relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                className="w-full p-2 bg-white rounded border border-gray-300 pr-10 text-sm"
                                {...register("password", { required: true })}
                            />
                            <div
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                            >
                                {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
                            </div>
                        </div>
                        <a
                            href="#"
                            className="absolute right-0 top-0 text-indigo-600 text-sm font-medium leading-tight"
                        >
                            Forgot Password?
                        </a>
                    </div>

                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            id="remember"
                            name="remember"
                            className="rounded border border-gray-300"
                        />
                        <label
                            htmlFor="remember"
                            className="ml-2 text-gray-900 text-xs font-normal leading-tight"
                        >
                            Remember me
                        </label>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full h-9 bg-indigo-600 rounded text-white font-medium mb-2"
                        >
                            Sign in
                        </button>
                    </div>

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
                        Don&apos;t have an account?{" "}
                        <Link href={"/register"} className="underline">
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
}
