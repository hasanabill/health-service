"use client";

import Image from "next/image";
import heroImg from "@/assets/img/heroImg.jpg";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-6 md:px-20 py-16 bg-gradient-to-br from-teal-50 to-white">
        {/* Text content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-teal-900">
            Empower Your Health
            <br />
            with <span className="text-teal-600">CareSync</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Smart calculators, AI diagnosis, and real-time doctor
            appointments—everything in one platform.
          </p>
          <button className="mt-6 px-6 py-3 text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all duration-300 shadow-lg">
            Get Started
          </button>
        </div>

        {/* Image */}
        <div className="flex-1 w-full">
          <Image
            src={heroImg}
            alt="Healthcare Hero"
            className="rounded-2xl shadow-lg object-cover"
            priority
          />
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="px-6 md:px-20 py-12 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-8 text-teal-800">
          Why Choose CareSync?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-teal-50 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-bold text-teal-700 mb-2">
              AI Symptom Checker
            </h3>
            <p className="text-gray-600">
              Get early insights using smart, AI-powered diagnosis tools.
            </p>
          </div>
          <div className="p-6 bg-teal-50 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-bold text-teal-700 mb-2">
              Health Calculators
            </h3>
            <p className="text-gray-600">
              Track BMI, calories, drug dosage, and more with ease.
            </p>
          </div>
          <div className="p-6 bg-teal-50 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-bold text-teal-700 mb-2">
              Appointments Made Easy
            </h3>
            <p className="text-gray-600">
              Book, manage, and track your consultations seamlessly.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
