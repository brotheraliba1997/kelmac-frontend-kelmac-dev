"use client";
// import MainDashboard from "@/app/components/dashboard--component/MainDashboard-component";
import React, { use, useEffect, useState } from "react";
import Table from "@/components/table/index";

import Link from "next/link";
import { GetUserRoleName, GetUserStatusName } from "@/lib/getUserRoleName";
import { FaTrash } from "react-icons/fa6";
import { useGetAllClassSchedulesQuery } from "@/store/api/courseApi";
import { useSelector } from "react-redux";
// import { useGetUsersQuery } from "@/app/redux/services/userApi";

export default function UserDashboard() {
  // const { data, error } = useGetUsersQuery({});

  // console.log("data from users page==>", data);
  const auth = useSelector((state: any) => state?.auth);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, error } = useGetAllClassSchedulesQuery({
    // search: "",
    // status: "1",
    studentId: auth?.user?.id || "",
    limit: pageSize,
    page: page,
  });

  console.log("Class Schedule Data:", data);

  const classes = (data as any)?.data || [];
  const newClasses = classes.flatMap((cls: any) =>
    ["10:00", "12:00", "02:00", "04:00", "06:00"].map((x) => ({
      ...cls,
      time: x,
    }))
  );
  // const totalEntries = (data as any)?.total || classes.length;
  const totalEntries = newClasses.length;
  const totalPages = Math.ceil(totalEntries / pageSize);

  const columns = [
    {
      displayName: "Course",
      displayField: (e: any) => (
        <div className="d-flex align-items-center gap-2">
          <div>
            <div className="fw-semibold text-capitalize text-gray-800">
              {e?.course?.title || "—"}
            </div>
            <div className="text-xs text-gray-500">
              {e?.course?.category?.name || "Course"}
            </div>
          </div>
        </div>
      ),
      searchable: true,
    },

    {
      displayName: "Instructor",
      displayField: (e: any) => (
        <div className="d-flex align-items-center gap-2">
          <span className="fw-medium text-gray-700">
            {e?.instructor?.firstName
              ? `${e.instructor.firstName} ${e.instructor.lastName}`
              : "—"}
          </span>
        </div>
      ),
      searchable: true,
    },

    {
      displayName: "Student",
      displayField: (e: any) => {
        const student = e?.students?.find((x: any) => x.id === auth?.user?.id);
        return (
          <div className="d-flex align-items-center gap-2">
            <span className="fw-medium text-gray-700">
              {student?.firstName
                ? `${student.firstName} ${student.lastName}`
                : "—"}
            </span>
          </div>
        );
      },
      searchable: true,
    },
    {
      displayName: "Date",
      displayField: (e: any) => (
        <div className="d-flex flex-column">
          <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-medium text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 me-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {e?.date
              ? new Date(e.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "—"}
          </span>
        </div>
      ),
      searchable: true,
    },

    {
      displayName: "Time",
      displayField: (e: any) => (
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-cyan-50 text-cyan-700 font-medium text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 me-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {e?.time || "—"}
        </span>
      ),
      searchable: true,
    },

    {
      displayName: "Duration",
      displayField: (e: any) => (
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 font-semibold text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 me-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          {e?.duration || 0} min
        </span>
      ),
      searchable: false,
    },

    {
      displayName: "Meet Link",
      displayField: (e: any) => (
        <div>
          {e?.googleMeetLink ? (
            <a
              href={e.googleMeetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md text-decoration-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Join Meeting
            </a>
          ) : (
            <span className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-400 rounded-lg font-medium text-sm">
              No Link
            </span>
          )}
        </div>
      ),
      searchable: false,
    },

    {
      displayName: "Status",
      displayField: (e: any) => {
        if (e?.status === "scheduled") {
          return (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-green-100 text-green-700 font-semibold text-xs uppercase tracking-wide">
              <span className="w-2 h-2 bg-green-500 rounded-full me-2 animate-pulse"></span>
              Scheduled
            </span>
          );
        } else if (e?.status === "cancelled") {
          return (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-red-100 text-red-700 font-semibold text-xs uppercase tracking-wide">
              <span className="w-2 h-2 bg-red-500 rounded-full me-2"></span>
              Cancelled
            </span>
          );
        } else if (e?.status === "completed") {
          return (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs uppercase tracking-wide">
              <span className="w-2 h-2 bg-blue-500 rounded-full me-2"></span>
              Completed
            </span>
          );
        } else {
          return (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-xs uppercase tracking-wide">
              <span className="w-2 h-2 bg-yellow-500 rounded-full me-2"></span>
              {e?.status || "Pending"}
            </span>
          );
        }
      },
      searchable: true,
    },
  ];

  return (
    <>
      <div className="min-h-[730px] p-4 bg-gray-100 w-full">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-4">
            <div className="flex justify-between items-center bg-gradient-to-r from-gray-700 to-gray-900 text-white p-4 rounded-md shadow-md">
              <h4 className="text-lg font-semibold">Class List</h4>
              {/* <Link
                href="/dashboard/users/create"
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1={12} y1={5} x2={12} y2={19} />
                  <line x1={5} y1={12} x2={19} y2={12} />
                </svg>
                Add Client
              </Link> */}
            </div>
          </div>

          <div className="bg-white rounded-md shadow-md overflow-hidden">
            <Table
              title="Class Schedules"
              columns={columns}
              dataSource={newClasses ?? []}
              isLoading={isLoading}
              totalPages={totalPages}
              totalEntries={totalEntries}
              page={page}
              setPage={setPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
            />
          </div>
        </div>
      </div>
    </>
  );
}
