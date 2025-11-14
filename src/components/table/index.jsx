"use client";

import DotsLoader from "../loaders/dotsLoader";
import TableHead from "./tableHead";
import TablePagination from "./tablePagination";
import TableRow from "./tableRow";
// import DataNotFound from "../../assets/images/table-data-not-found.jpg";
import { useEffect, useState } from "react";

function Table({
  title,
  columns,
  dataSource,
 
  isLoading,
  totalPages,
  totalEntries,
  page,
  setPage,
  pageSize,
  setPageSize,
}) {
  //   const { title, columns, dataSource, onRowClick, isLoading } = props;
  // let searchList = columns.filter((x) => x.searchAble);

  // const [page, setCurrentPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentItems, setCurrentItems] = useState([]);

  // Calculate the range of items to display on the current page
  const indexOfLastItem = page * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="w-full p-4">
  <div className="max-w-[1200px] mx-auto">
   
      {/* Card Header */}
     

      {/* Card Body */}
      <div className="p-4 min-h-[200px] relative">
        {/* Table Head / Page Size Selector */}
        <TableHead
          pageSize={pageSize}
          setPageSize={setPageSize}
          setPage={setPage}
        />

        {/* Loading & Empty States */}
        {isLoading &&
        dataSource &&
        Array.isArray(dataSource) &&
        dataSource.length === 0 ? (
          <div className="flex items-center justify-center h-48">
            <DotsLoader dark size={40} />
          </div>
        ) : dataSource &&
          Array.isArray(dataSource) &&
          dataSource.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-500">
            <p>Data not found</p>
          </div>
        ) : (
          <div className="overflow-x-auto my-3 relative">
            {/* Table loader overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
                <DotsLoader dark size={40} />
              </div>
            )}

            <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    S.No
                  </th>
                  {columns &&
                    Array.isArray(columns) &&
                    columns.map((x, i) => (
                      <th
                        key={i}
                        className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                      >
                        {x.displayName}
                      </th>
                    ))}
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {dataSource &&
                  Array.isArray(dataSource) &&
                  dataSource.length > 0 &&
                  dataSource.map((rowData, i) => (
                    <TableRow
                      srNo={indexOfFirstItem + i + 1}
                      key={i}
                      index={i}
                      rowData={rowData}
                      columns={columns}
                    />
                  ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4">
              <TablePagination
                page={page}
                pageSize={pageSize}
                totalItems={dataSource?.length}
                onPageChange={handlePageChange}
                totalPages={totalPages}
                totalEntries={totalEntries}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  </div>


  );
}
export default Table;
