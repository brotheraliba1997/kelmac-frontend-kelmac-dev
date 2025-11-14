"use client";
// import MainDashboard from "@/app/components/dashboard--component/MainDashboard-component";
import React, { use, useEffect, useState } from "react";
import Table from "@/components/table/index";

import Link from "next/link";
import { GetUserRoleName, GetUserStatusName } from "@/lib/getUserRoleName";
// import { useGetUsersQuery } from "@/app/redux/services/userApi";

export default function UserDashboard() {
  // const { data, error } = useGetUsersQuery({});

  // console.log("data from users page==>", data);
  const allUsers = [
    {
      id: 1,
      firstName: "Hamza",
      lastName: "Ali",
      email: "hamza@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      firstName: "Usman",
      lastName: "Khan",
      email: "usman@example.com",
      role: "Student",
      status: "Pending",
    },
    {
      id: 3,
      firstName: "Ali",
      lastName: "Raza",
      email: "ali.raza@example.com",
      role: "Instructor",
      status: "Active",
    },
    {
      id: 4,
      firstName: "Ahsan",
      lastName: "Qureshi",
      email: "ahsan.q@example.com",
      role: "Corporate",
      status: "Blocked",
    },
    {
      id: 5,
      firstName: "Taha",
      lastName: "Malik",
      email: "taha.malik@example.com",
      role: "Student",
      status: "Active",
    },
    {
      id: 6,
      firstName: "Bilal",
      lastName: "Shahid",
      email: "bilal.shahid@example.com",
      role: "Instructor",
      status: "Active",
    },
    {
      id: 7,
      firstName: "Zain",
      lastName: "Ahmad",
      email: "zain.ahmad@example.com",
      role: "Corporate",
      status: "Pending",
    },
    {
      id: 8,
      firstName: "Imran",
      lastName: "Khalid",
      email: "imran.k@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 9,
      firstName: "Saad",
      lastName: "Hassan",
      email: "saad.h@example.com",
      role: "Student",
      status: "Pending",
    },
    {
      id: 10,
      firstName: "Hassan",
      lastName: "Butt",
      email: "hassan.b@example.com",
      role: "Instructor",
      status: "Active",
    },
    {
      id: 11,
      firstName: "Nabeel",
      lastName: "Iqbal",
      email: "nabeel.i@example.com",
      role: "Corporate",
      status: "Blocked",
    },
  ];

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  const totalEntries = allUsers.length;
  const totalPages = Math.ceil(totalEntries / pageSize);

  const indexOfLastItem = page * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentData = allUsers.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [page, pageSize]);

  const columns = [
    {
      displayName: "Client",
      displayField: (e: any) => (
        <div className="d-flex align-items-center gap-2">
          <div className="fw-semibold text-capitalize">
            {e?.firstName} {e?.lastName}
          </div>
        </div>
      ),
      searchable: true,
    },

    {
      displayName: "Email",
      displayField: (e: any) => (
        <div className="text-lowercase">{e?.email}</div>
      ),
      searchable: true,
    },

    {
      displayName: "Role",
      displayField: (e: any) => (
        <span className="inline-block bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded capitalize">
          {GetUserRoleName(e?.role?._id)}
        </span>
      ),
      searchable: true,
    },

    {
      displayName: "Status",
      displayField: (e: any) => {
        const statusName = GetUserStatusName(e?.status?.id);

        return (
          <>
            {statusName === "Active" && (
              <span className="inline-block bg-green-500 text-white text-xs font-medium px-2 py-1 rounded capitalize">
                {statusName}
              </span>
            )}
            {statusName === "Blocked" && (
              <span className="inline-block bg-red-500 text-white text-xs font-medium px-2 py-1 rounded capitalize">
                {statusName}
              </span>
            )}
            {statusName === "Pending" && (
              <span className="inline-block bg-yellow-400 text-gray-800 text-xs font-medium px-2 py-1 rounded capitalize">
                {statusName}
              </span>
            )}
            {statusName === "unknown" && (
              <span className="inline-block bg-gray-400 text-white text-xs font-medium px-2 py-1 rounded capitalize">
                Unknown
              </span>
            )}
          </>
        );
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
              title="Users List"
              columns={columns}
              dataSource={allUsers ?? []}
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
