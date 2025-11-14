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
  const totalEntries = (data as any)?.total || classes.length;
  const totalPages = Math.ceil(totalEntries / pageSize);

  const columns = [
    {
      displayName: "Course",
      displayField: (e: any) => (
        <div className="fw-semibold text-capitalize">
          {e?.course?.title || "—"}
        </div>
      ),
      searchable: true,
    },

    {
      displayName: "Instructor",
      displayField: (e: any) => (
        <div className="fw-medium text-primary">
          {e?.instructor?.firstName
            ? `${e.instructor.firstName} ${e.instructor.lastName}`
            : "—"}
        </div>
      ),
      searchable: true,
    },
    {
      displayName: "Student",
      displayField: (e: any) => (
        <div className="fw-medium text-primary">
          {e?.students?.find((x: any) => x.id === auth?.user?.id)?.firstName
            ? `${
                e?.students?.find((x: any) => x.id === auth?.user?.id)
                  ?.firstName
              } ${
                e?.students?.find((x: any) => x.id === auth?.user?.id)?.lastName
              }`
            : "—"}
        </div>
      ),
      searchable: true,
    },
    {
      displayName: "Date",
      displayField: (e: any) => (
        <span className="badge bg-light text-dark">{e?.date || "—"}</span>
      ),
      searchable: true,
    },

    {
      displayName: "Time",
      displayField: (e: any) => (
        <span className="badge bg-info text-dark">{e?.time || "—"}</span>
      ),
      searchable: true,
    },

    {
      displayName: "Duration",
      displayField: (e: any) => (
        <span className="badge bg-secondary">{e?.duration || 0} min</span>
      ),
      searchable: false,
    },

    {
      displayName: "Meet Link",
      displayField: (e: any) => (
        <a
          href={e?.googleMeetLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none text-primary fw-medium"
        >
          {e?.googleMeetLink ? "Join Meeting" : "—"}
        </a>
      ),
      searchable: false,
    },

    {
      displayName: "Status",
      displayField: (e: any) =>
        e?.status === "scheduled" ? (
          <span className="badge bg-success">Scheduled</span>
        ) : e?.status === "cancelled" ? (
          <span className="badge bg-danger">Cancelled</span>
        ) : (
          <span className="badge bg-warning text-dark">{e?.status || "—"}</span>
        ),
      searchable: true,
    },

    // {
    //   displayName: "Actions",
    //   displayField: (e: any) => (
    //     <div className="d-flex gap-3">
    //       <FaEye
    //         className="text-primary"
    //         style={{ cursor: "pointer" }}
    //         //   onClick={() => handleView?.(e)}
    //         title="View"
    //       />

    //       <Link href={`/dashboard/class-schedule/${e?.id}`}>
    //         <FaEdit
    //           className="text-success"
    //           style={{ cursor: "pointer" }}
    //           title="Edit"
    //         />
    //       </Link>

    //       <FaTrash
    //         className="text-danger"
    //         style={{ cursor: "pointer" }}
    //         //   onClick={() => handleDelete?.(e)}
    //         title="Delete"
    //       />
    //     </div>
    //   ),
    // },
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
              dataSource={classes ?? []}
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
