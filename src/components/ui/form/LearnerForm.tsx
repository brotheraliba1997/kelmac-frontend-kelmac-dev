"use client";

import { useRegisterInterpreterMutation } from "@/store/api/authApi";
import { useCreateBookingMutation } from "@/store/api/courseApi";
import { Course } from "@/types/course";
import React, { useState } from "react";

import { toast } from "react-hot-toast";

interface RegisterFormState {
  firstName: string;
  lastName: string;
  company: string;
  jobTitle: string;
  emailAddress: string;
  phoneNumber: string;
  country: string;
  industry: string;
  email: string;
  password?: string;
}

export default function LearnerForm() {
  const [formData, setFormData] = useState<any>({
    firstName: "",
    lastName: "",
    password: "",
    company: "",
    jobTitle: "",
    emailAddress: "",
    phoneNumber: "",
    country: "",
    industry: "",
  });

  const [registerInterpreter, { isLoading }] = useRegisterInterpreterMutation();
  const [createBooking, { isLoading: isBookingLoading }] =
    useCreateBookingMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic client-side validation
    const requiredFields = [
      "firstName",
      "lastName",
      "password",
      "company",
      "jobTitle",
      "emailAddress",
      "phoneNumber",
      "country",
      "industry",
    ];
    for (const field of requiredFields) {
      if (!formData[field as keyof RegisterFormState]) {
        toast.error(`Please fill ${field}`);
        return;
      }
    }

    // try {
    const data = await registerInterpreter({
      ...formData,
      email: formData.emailAddress,
      role: { id: 2 },
      status: { id: 1 },
    });

    const course: any = JSON.parse(
      localStorage.getItem("selectedCourse") || "{}"
    );

    const timetableId = localStorage.getItem("selectedTimetableId") || "";
    if (data?.data?.user?.id) {
      await createBooking({
        courseId: course?.id,
        studentId: data?.data?.user?.id,
        timeTableId: timetableId,
      }).unwrap();
    }

    toast.success("Registration successful! Please check your email.");
    setFormData({
      firstName: "",
      lastName: "",
      password: "",
      company: "",
      jobTitle: "",
      emailAddress: "",
      phoneNumber: "",
      country: "",
      industry: "",
    });
    // } catch (error: any) {
    //   console.error("Registration error:", error);
    //   toast.error(error?.data?.message || "Registration failed.");
    // }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name + Last Name */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Full Name*
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Last Name*
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition"
          />
        </div>
      </div>

      {/* Company + Job Title */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Company Name*
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Enter your company name"
            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Job Title*
          </label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="Enter your job title"
            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Email Address*
        </label>
        <input
          type="email"
          name="emailAddress"
          value={formData.emailAddress}
          onChange={handleChange}
          placeholder="Enter your email address"
          className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition"
        />
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Phone Number*
        </label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-1 focus:border-secondary focus:ring-secondary outline-none transition"
        />
      </div>

      {/* Country + Industry */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Country*
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition"
          >
            <option value="">Select country</option>
            <option value="Pakistan">Pakistan</option>
            <option value="United States">United States</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Industry*
          </label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition"
          >
            <option value="">Select industry</option>
            <option value="Technology">Technology</option>
            <option value="Education">Education</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-secondary text-white font-medium py-3 rounded-lg hover:bg-secondary/90 transition disabled:opacity-70"
      >
        {isLoading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
