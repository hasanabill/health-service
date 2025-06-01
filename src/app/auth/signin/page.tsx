"use client";

import { signIn } from "next-auth/react";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

interface SignInForm {
  email: string;
  password: string;
}

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>();

  const onSubmit: SubmitHandler<SignInForm> = async (data) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.ok) {
      router.push("/");
      console.log("Sign In Successful");
    } else {
      console.log("Sign In Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className="w-full p-2 border rounded mb-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <label className="block mb-2 text-sm font-medium">Password</label>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          className="w-full p-2 border rounded mb-2"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
